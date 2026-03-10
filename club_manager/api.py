# Copyright (c) 2026, Group 5 and contributors
# For license information, please see license.txt

import frappe
from frappe import _


@frappe.whitelist(allow_guest=True)
def sign_up(email, full_name, password, role="Student"):
	"""Create a new user with the given password (for Club Manager signup).
	Only Student and Coordinator can sign up. Admin is a single fixed account."""
	from frappe.website.utils import is_signup_disabled
	from frappe.utils.password import update_password as _update_password

	if is_signup_disabled():
		frappe.throw(_("Sign Up is disabled"), title=_("Not Allowed"))
	role = (role or "Student").strip().lower()
	if role not in ("student", "coordinator"):
		frappe.throw(_("Only Student and Coordinator can sign up. Admin is a fixed account."), title=_("Invalid Role"))
	email = (email or "").strip().lower()
	if not email:
		frappe.throw(_("Email is required"), title=_("Invalid"))
	if frappe.db.exists("User", email):
		frappe.throw(_("Already Registered. Please sign in."), title=_("Exists"))
	try:
		doc = frappe.get_doc({
			"doctype": "User",
			"email": email,
			"first_name": full_name.split()[0] if full_name else email.split("@")[0],
			"last_name": " ".join(full_name.split()[1:]) if full_name and len(full_name.split()) > 1 else "",
			"enabled": 1,
			"new_password": password,
			"user_type": "System User",
		})
		doc.append("roles", {"role": "Blogger"})
		if role == "coordinator":
			doc.append("roles", {"role": "Club Coordinator"})
		doc.flags.ignore_permissions = True
		doc.flags.no_welcome_mail = True
		doc.flags.ignore_password_policy = True
		doc.insert()
		_update_password(user=doc.name, pwd=password, logout_all_sessions=0)
		frappe.db.commit()
		return {"ok": True, "message": _("Account created! Please sign in."), "user": doc.name}
	except Exception as e:
		frappe.db.rollback()
		frappe.log_error(frappe.get_traceback(), "Club Manager Signup")
		raise


@frappe.whitelist(allow_guest=True)
def ensure_demo_users():
	"""Create demo users if they don't exist. Call on login page load."""
	try:
		if not frappe.db.exists("Role", "Club Coordinator"):
			frappe.get_doc({"doctype": "Role", "role_name": "Club Coordinator"}).insert(ignore_permissions=True)
		from club_manager.evento.seed_data import _seed_demo_users
		_seed_demo_users()
		frappe.db.commit()
		return {"ok": True}
	except Exception as e:
		frappe.log_error(frappe.get_traceback(), "Club Manager ensure_demo_users")
		return {"ok": False, "error": str(e)}


@frappe.whitelist()
def setup_club_manager_permissions():
	"""Manually run permission setup. Call via bench execute club_manager.api.setup_club_manager_permissions"""
	from club_manager.install import setup_permissions
	setup_permissions()
	return {"ok": True}


@frappe.whitelist()
def get_my_role():
	"""Return the current user's Club Manager role: admin, coordinator, or student."""
	if frappe.session.user == "Guest":
		return None
	roles = frappe.get_roles(frappe.session.user)
	if "System Manager" in roles:
		return "admin"
	if "Club Coordinator" in roles:
		return "coordinator"
	return "student"


@frappe.whitelist()
def get_clubs(filters=None):
	"""Get list of clubs for Club Manager app."""
	filters = frappe.parse_json(filters) or {}
	clubs = frappe.get_all(
		"Club",
		fields=["name", "club_name", "description", "coordinator", "category", "status", "member_count"],
		filters=filters,
		order_by="club_name asc",
		ignore_permissions=True,
	)
	# Resolve coordinator name
	for c in clubs:
		if c.get("coordinator"):
			c["coordinator_name"] = frappe.db.get_value("User", c["coordinator"], "full_name") or c["coordinator"]
		else:
			c["coordinator_name"] = ""
		c["members"] = c.get("member_count") or 0
	return clubs


@frappe.whitelist()
def get_events(filters=None):
	"""Get list of events for Club Manager app."""
	filters = frappe.parse_json(filters) or {}
	events = frappe.get_all(
		"Event",
		fields=["name", "event_name", "club", "description", "event_date", "event_time", "location", "capacity", "status", "registered_count"],
		filters=filters,
		order_by="event_date desc",
		ignore_permissions=True,
	)
	for e in events:
		e["name_id"] = e["name"]
		e["date"] = str(e.get("event_date") or "")
		e["time"] = str(e.get("event_time") or "09:00")[:5] if e.get("event_time") else "09:00"
		e["registered"] = e.get("registered_count") or 0
		e["club_name"] = e.get("club") or ""
	return events


@frappe.whitelist()
def get_registrations(filters=None):
	"""Get list of event registrations."""
	filters = frappe.parse_json(filters) or {}
	regs = frappe.get_all(
		"Event Registration",
		fields=["name", "event", "student", "status"],
		filters=filters,
		order_by="modified desc",
		ignore_permissions=True,
	)
	for r in regs:
		r["eventName"] = frappe.db.get_value("Event", r["event"], "event_name") if r.get("event") else ""
		r["studentName"] = frappe.db.get_value("User", r["student"], "full_name") if r.get("student") else r.get("student", "")
		r["email"] = frappe.db.get_value("User", r["student"], "email") or r.get("student", "")
		creation = frappe.db.get_value("Event Registration", r["name"], "creation")
		r["regDate"] = str(creation)[:10] if creation else ""
	return regs


@frappe.whitelist()
def get_attendance(event=None, filters=None):
	"""Get attendance list for an event."""
	filters = frappe.parse_json(filters) or {}
	if event:
		filters["event"] = event
	att = frappe.get_all(
		"Event Attendance",
		fields=["name", "event", "student", "status", "check_in_time"],
		filters=filters,
		order_by="student asc",
		ignore_permissions=True,
	)
	for a in att:
		a["name_attr"] = a.get("student", "")
		a["studentId"] = a.get("student", "")
		a["student_name"] = frappe.db.get_value("User", a["student"], "full_name") if a.get("student") else ""
		a["name"] = a.get("student_name") or a.get("student", "")
		a["time"] = str(a.get("check_in_time") or "-")[:8] if a.get("check_in_time") else "-"
	return att


@frappe.whitelist()
def create_user(data):
	"""Create a new user (admin only)."""
	data = frappe.parse_json(data) if isinstance(data, str) else data
	if "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	email = (data.get("email") or "").strip().lower()
	if not email:
		frappe.throw(_("Email is required"))
	if frappe.db.exists("User", email):
		frappe.throw(_("User already exists"))
	first = (data.get("firstName") or "").strip() or email.split("@")[0]
	last = (data.get("lastName") or "").strip()
	role = (data.get("role") or "Student").strip()
	enabled = 1 if (data.get("status") or "Active") == "Active" else 0
	doc = frappe.get_doc({
		"doctype": "User",
		"email": email,
		"first_name": first,
		"last_name": last,
		"enabled": enabled,
		"user_type": "System User",
	})
	doc.append("roles", {"role": "Blogger"})
	if role == "Coordinator":
		doc.append("roles", {"role": "Club Coordinator"})
	elif role == "Admin":
		doc.append("roles", {"role": "System Manager"})
	if data.get("password"):
		doc.new_password = data.get("password")
	doc.flags.ignore_permissions = True
	doc.insert()
	frappe.db.commit()
	return {"ok": True, "id": doc.name}


@frappe.whitelist()
def update_user(email, data):
	"""Update a user (admin only)."""
	data = frappe.parse_json(data) if isinstance(data, str) else data
	if "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	doc = frappe.get_doc("User", email)
	if data.get("firstName") is not None:
		doc.first_name = data.get("firstName", "").strip()
	if data.get("lastName") is not None:
		doc.last_name = data.get("lastName", "").strip()
	if data.get("status") is not None:
		doc.enabled = 1 if data.get("status") == "Active" else 0
	if data.get("role") is not None:
		doc.roles = []
		doc.append("roles", {"role": "Blogger"})
		if data.get("role") == "Coordinator":
			doc.append("roles", {"role": "Club Coordinator"})
		elif data.get("role") == "Admin":
			doc.append("roles", {"role": "System Manager"})
	if data.get("password"):
		doc.new_password = data.get("password")
	doc.flags.ignore_permissions = True
	doc.save()
	frappe.db.commit()
	return {"ok": True}


@frappe.whitelist()
def delete_user(email):
	"""Disable a user (admin only)."""
	if "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	doc = frappe.get_doc("User", email)
	doc.enabled = 0
	doc.flags.ignore_permissions = True
	doc.save()
	frappe.db.commit()
	return {"ok": True}


@frappe.whitelist()
def get_users(filters=None):
	"""Get users for admin user management. Uses User doctype."""
	filters = frappe.parse_json(filters) or {}
	users = frappe.get_all(
		"User",
		fields=["name", "full_name", "email", "enabled", "creation"],
		filters={**filters, "name": ["!=", "Guest"], "user_type": "System User"},
		order_by="full_name asc",
		ignore_permissions=True,
	)
	result = []
	for u in users:
		creation = u.get("creation")
		join_date = str(creation)[:10] if creation else ""
		roles = frappe.get_roles(u["name"])
		if "System Manager" in roles:
			role = "Admin"
		elif "Club Coordinator" in roles:
			role = "Coordinator"
		else:
			role = "Student"
		result.append({
			"id": u["name"],
			"firstName": (u.get("full_name") or "").split()[0] if u.get("full_name") else u["name"],
			"lastName": " ".join((u.get("full_name") or "").split()[1:]) if u.get("full_name") else "",
			"email": u.get("email") or u["name"],
			"role": role,
			"status": "Active" if u.get("enabled") else "Inactive",
			"joinDate": join_date,
		})
	return result


def _can_manage_club_or_event():
	"""Check if user can manage clubs/events (admin or coordinator)."""
	roles = frappe.get_roles()
	return "System Manager" in roles or "Club Coordinator" in roles


@frappe.whitelist()
def create_club(data):
	"""Create a new club."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	data = frappe.parse_json(data) if isinstance(data, str) else data
	doc = frappe.new_doc("Club")
	doc.club_name = data.get("club_name") or data.get("name")
	doc.description = data.get("description", "")
	doc.coordinator = data.get("coordinator")
	doc.category = data.get("category", "Technology")
	doc.status = data.get("status", "Active")
	doc.flags.ignore_permissions = True
	doc.insert()
	return {"name": doc.name, "id": doc.name}


@frappe.whitelist()
def update_club(name, data):
	"""Update a club."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	data = frappe.parse_json(data) if isinstance(data, str) else data
	doc = frappe.get_doc("Club", name)
	for k, v in data.items():
		if hasattr(doc, k):
			setattr(doc, k, v)
	doc.flags.ignore_permissions = True
	doc.save()
	return {"name": doc.name}


@frappe.whitelist()
def delete_club(name):
	"""Delete a club."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	frappe.delete_doc("Club", name, ignore_permissions=True)
	return {"ok": True}


@frappe.whitelist()
def create_event(data):
	"""Create a new event."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	data = frappe.parse_json(data) if isinstance(data, str) else data
	doc = frappe.new_doc("Event")
	doc.event_name = data.get("event_name") or data.get("name")
	doc.club = data.get("club")
	doc.description = data.get("description", "")
	doc.event_date = data.get("event_date") or data.get("date")
	doc.event_time = data.get("event_time") or data.get("time") or "09:00"
	doc.location = data.get("location", "")
	doc.capacity = data.get("capacity", 100)
	doc.status = data.get("status", "Upcoming")
	doc.flags.ignore_permissions = True
	doc.insert()
	return {"name": doc.name, "id": doc.name}


@frappe.whitelist()
def update_event(name, data):
	"""Update an event."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	data = frappe.parse_json(data) if isinstance(data, str) else data
	doc = frappe.get_doc("Event", name)
	for k, v in data.items():
		if hasattr(doc, k):
			setattr(doc, k, v)
	doc.flags.ignore_permissions = True
	doc.save()
	return {"name": doc.name}


@frappe.whitelist()
def delete_event(name):
	"""Delete an event."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	frappe.delete_doc("Event", name, ignore_permissions=True)
	return {"ok": True}


@frappe.whitelist()
def register_for_event(event, student=None):
	"""Student registers for an event."""
	student = student or frappe.session.user
	if student != frappe.session.user and "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not allowed to register on behalf of another user"))
	if frappe.db.exists("Event Registration", {"event": event, "student": student}):
		return {"ok": False, "message": "Already registered"}
	doc = frappe.new_doc("Event Registration")
	doc.event = event
	doc.student = student
	doc.status = "Pending"
	doc.flags.ignore_permissions = True
	doc.insert()
	# Update event registered count
	evt = frappe.get_doc("Event", event)
	evt.registered_count = frappe.db.count("Event Registration", {"event": event})
	evt.save(ignore_permissions=True)
	return {"ok": True}


@frappe.whitelist()
def join_club(club, member=None):
	"""Student joins a club."""
	member = member or frappe.session.user
	if member != frappe.session.user and "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not allowed to join on behalf of another user"))
	if frappe.db.exists("Club Member", {"club": club, "member": member}):
		return {"ok": False, "message": "Already a member"}
	doc = frappe.new_doc("Club Member")
	doc.club = club
	doc.member = member
	doc.role = "Student"
	doc.flags.ignore_permissions = True
	doc.insert()
	# Update club member count
	c = frappe.get_doc("Club", club)
	c.member_count = frappe.db.count("Club Member", {"club": club})
	c.save(ignore_permissions=True)
	return {"ok": True}


@frappe.whitelist()
def leave_club(club, member=None):
	"""Student leaves a club."""
	member = member or frappe.session.user
	if member != frappe.session.user and "System Manager" not in frappe.get_roles():
		frappe.throw(_("Not allowed to leave on behalf of another user"))
	docs = frappe.get_all("Club Member", filters={"club": club, "member": member}, ignore_permissions=True)
	for d in docs:
		frappe.delete_doc("Club Member", d.name, ignore_permissions=True)
	c = frappe.get_doc("Club", club)
	c.member_count = frappe.db.count("Club Member", {"club": club})
	c.save(ignore_permissions=True)
	return {"ok": True}


@frappe.whitelist()
def update_attendance(event, student, status):
	"""Update attendance status for a student at an event."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	existing = frappe.db.get_value("Event Attendance", {"event": event, "student": student}, "name")
	from datetime import datetime
	now = datetime.now().strftime("%H:%M:%S")
	if existing:
		doc = frappe.get_doc("Event Attendance", existing)
		doc.status = status
		doc.check_in_time = now if status == "Present" or status == "Late" else None
		doc.flags.ignore_permissions = True
		doc.save()
	else:
		doc = frappe.new_doc("Event Attendance")
		doc.event = event
		doc.student = student
		doc.status = status
		doc.check_in_time = now if status in ("Present", "Late") else None
		doc.flags.ignore_permissions = True
		doc.insert()
	return {"ok": True}


@frappe.whitelist()
def get_my_clubs(member=None):
	"""Get clubs the current user is a member of."""
	member = member or frappe.session.user
	memberships = frappe.get_all("Club Member", filters={"member": member}, fields=["club"], ignore_permissions=True)
	return [m["club"] for m in memberships]


@frappe.whitelist()
def get_my_registrations(member=None):
	"""Get events the current user is registered for."""
	member = member or frappe.session.user
	regs = frappe.get_all("Event Registration", filters={"student": member}, fields=["event"], ignore_permissions=True)
	return [r["event"] for r in regs]


@frappe.whitelist()
def update_registration(name, status):
	"""Approve or reject a registration."""
	if not _can_manage_club_or_event():
		frappe.throw(_("Not permitted"), frappe.PermissionError)
	doc = frappe.get_doc("Event Registration", name)
	doc.status = status
	doc.flags.ignore_permissions = True
	doc.save()
	return {"ok": True}


@frappe.whitelist()
def get_my_attendance(member=None):
	"""Get attendance records for the current user."""
	member = member or frappe.session.user
	att = frappe.get_all(
		"Event Attendance",
		filters={"student": member},
		fields=["event", "status", "check_in_time"],
		order_by="modified desc",
		ignore_permissions=True,
	)
	result = []
	for a in att:
		evt = frappe.db.get_value("Event", a["event"], ["event_name", "event_date", "club"], as_dict=True)
		result.append({
			"eventName": evt.get("event_name") if evt else "",
			"date": str(evt.get("event_date")) if evt else "",
			"club": evt.get("club") if evt else "",
			"status": a.get("status", "Present"),
		})
	return result


@frappe.whitelist()
def get_my_certificates(member=None):
	"""Get count of Student Activity records with certificates for the current user."""
	member = member or frappe.session.user
	# Student Activity uses student_id (often email) to identify students
	activities = frappe.get_all(
		"Student Activity",
		filters={"student_id": member},
		fields=["certificate"],
		limit_page_length=500,
		ignore_permissions=True,
	)
	count = sum(1 for a in activities if a.get("certificate"))
	return count


@frappe.whitelist()
def generate_report(report_type, from_date, to_date, format="CSV"):
	"""Generate a report and return metadata for the reports list."""
	import csv
	import io
	import base64
	if report_type == "Event":
		events = frappe.get_all(
			"Event",
			fields=["name", "event_name", "club", "event_date", "event_time", "location", "capacity", "registered_count", "status"],
			filters=[["event_date", ">=", from_date], ["event_date", "<=", to_date]],
			order_by="event_date asc",
			ignore_permissions=True,
		)
		rows = [["Event", "Club", "Date", "Time", "Location", "Capacity", "Registered", "Status"]]
		for e in events:
			rows.append([
				e.get("event_name") or e.get("name"),
				e.get("club") or "",
				str(e.get("event_date") or ""),
				str(e.get("event_time") or "")[:5] if e.get("event_time") else "",
				e.get("location") or "",
				e.get("capacity") or 0,
				e.get("registered_count") or 0,
				e.get("status") or "",
			])
	elif report_type == "Attendance":
		att = frappe.get_all(
			"Event Attendance",
			fields=["event", "student", "status", "check_in_time"],
			filters=[],
			order_by="modified desc",
			ignore_permissions=True,
		)
		rows = [["Event", "Student", "Status", "Check-in Time"]]
		for a in att:
			evt_name = frappe.db.get_value("Event", a.get("event"), "event_name") if a.get("event") else ""
			stu_name = frappe.db.get_value("User", a.get("student"), "full_name") if a.get("student") else ""
			rows.append([
				evt_name or "",
				stu_name or a.get("student") or "",
				a.get("status") or "",
				str(a.get("check_in_time") or "")[:8] if a.get("check_in_time") else "",
			])
	elif report_type == "Registration":
		regs = frappe.get_all(
			"Event Registration",
			fields=["event", "student", "status", "creation"],
			filters=[],
			order_by="creation desc",
			ignore_permissions=True,
		)
		rows = [["Event", "Student", "Status", "Date"]]
		for r in regs:
			evt_name = frappe.db.get_value("Event", r.get("event"), "event_name") if r.get("event") else ""
			stu_name = frappe.db.get_value("User", r.get("student"), "full_name") if r.get("student") else ""
			rows.append([
				evt_name or "",
				stu_name or r.get("student") or "",
				r.get("status") or "",
				str(r.get("creation") or "")[:10] if r.get("creation") else "",
			])
	else:
		clubs = frappe.get_all("Club", fields=["club_name", "coordinator", "member_count", "status"], ignore_permissions=True)
		rows = [["Club", "Coordinator", "Members", "Status"]]
		for c in clubs:
			coord_name = frappe.db.get_value("User", c.get("coordinator"), "full_name") if c.get("coordinator") else ""
			rows.append([
				c.get("club_name") or c.get("name") or "",
				coord_name or c.get("coordinator") or "",
				c.get("member_count") or 0,
				c.get("status") or "",
			])
	buf = io.StringIO()
	writer = csv.writer(buf)
	writer.writerows(rows)
	csv_content = buf.getvalue()
	b64 = base64.b64encode(csv_content.encode("utf-8")).decode("ascii")
	from datetime import datetime
	report_id = f"RPT-{datetime.now().strftime('%Y%m%d%H%M%S')}"
	return {
		"ok": True,
		"id": report_id,
		"name": f"{report_type} Report - {from_date} to {to_date}",
		"type": report_type,
		"date": to_date,
		"format": format,
		"content": b64,
		"filename": f"{report_type.replace(' ', '_')}_Report_{from_date}_{to_date}.csv",
	}


@frappe.whitelist()
def get_dashboard_stats(role="student"):
	"""Get dashboard statistics."""
	stats = {}
	if role == "admin":
		stats["total_clubs"] = frappe.db.count("Club")
		stats["total_events"] = frappe.db.count("Event")
		stats["total_users"] = frappe.db.count("User", {"user_type": "System User", "name": ["!=", "Guest"]})
		stats["upcoming_events"] = frappe.db.count("Event", {"status": "Upcoming"})
	elif role == "coordinator":
		stats["total_events"] = frappe.db.count("Event")
		stats["total_registrations"] = frappe.db.count("Event Registration")
		stats["completed_events"] = frappe.db.count("Event", {"status": "Completed"})
	else:
		user = frappe.session.user
		stats["my_clubs"] = frappe.db.count("Club Member", {"member": user})
		stats["my_registrations"] = frappe.db.count("Event Registration", {"student": user})
		stats["my_attendance"] = frappe.db.count("Event Attendance", {"student": user})
	return stats
