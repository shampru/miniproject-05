import frappe
from frappe.permissions import add_permission


def after_install():
	"""Set Club Manager Login as default desk home page and seed demo data."""
	if not frappe.db.exists("Role", "Club Coordinator"):
		frappe.get_doc({"doctype": "Role", "role_name": "Club Coordinator"}).insert(ignore_permissions=True)
	frappe.db.set_default("desktop:home_page", "club-manager-login")
	setup_permissions()
	frappe.db.commit()
	try:
		from club_manager.evento.seed_data import seed
		seed()
	except Exception:
		pass


def setup_permissions():
	"""Add Page and doctype permissions for Club Coordinator and Blogger."""
	roles_to_add = ["Club Coordinator", "Blogger"]
	doctypes_for_read = ["Page", "Club", "Event", "Event Registration", "Event Attendance", "Club Member", "Student Activity", "Activity Type"]
	doctypes_for_coordinator_write = ["Club", "Event", "Event Registration", "Event Attendance"]
	doctypes_for_blogger_create = ["Event Registration", "Club Member"]  # Students need create for register/join
	for role in roles_to_add:
		for dt in doctypes_for_read:
			try:
				add_permission(dt, role, ptype="read")
			except Exception:
				pass
	for dt in doctypes_for_coordinator_write:
		try:
			add_permission(dt, "Club Coordinator", ptype="write")
			add_permission(dt, "Club Coordinator", ptype="create")
		except Exception:
			pass
	for dt in doctypes_for_blogger_create:
		try:
			add_permission(dt, "Blogger", ptype="create")
		except Exception:
			pass
	frappe.db.commit()
	frappe.clear_cache(doctype="Page")


def after_migrate():
	"""Ensure Club Coordinator role exists, coordinator users have it, and permissions are set."""
	if not frappe.db.exists("Role", "Club Coordinator"):
		frappe.get_doc({"doctype": "Role", "role_name": "Club Coordinator"}).insert(ignore_permissions=True)
		frappe.db.commit()
	setup_permissions()
	try:
		from club_manager.evento.seed_data import _seed_demo_users
		_seed_demo_users()
		frappe.db.commit()
	except Exception:
		pass
