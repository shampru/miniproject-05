"""Seed initial Club Manager data for demo."""
import frappe


# One admin only (admin@college.edu / password123). Coordinators and students can sign up.
DEMO_USERS = [
	{"email": "admin@college.edu", "full_name": "Admin User", "password": "password123", "role": "admin"},
	{"email": "michael@college.edu", "full_name": "Michael Coordinator", "password": "password123", "role": "coordinator"},
	{"email": "emily@college.edu", "full_name": "Emily Student", "password": "password123", "role": "student"},
	{"email": "coordinator@college.edu", "full_name": "Coordinator User", "password": "password123", "role": "coordinator"},
	{"email": "student@college.edu", "full_name": "Student User", "password": "password123", "role": "student"},
]


def seed():
	_seed_demo_users()
	if frappe.db.count("Club") > 0:
		return  # Clubs already seeded

	clubs = [
		{"club_name": "Computer Science Club", "description": "Coding, hackathons, and tech workshops", "category": "Technology"},
		{"club_name": "Photography Club", "description": "Photography techniques and exhibitions", "category": "Arts"},
		{"club_name": "Music Band", "description": "Practice sessions and live performances", "category": "Cultural"},
		{"club_name": "Robotics Club", "description": "Building robots and automation", "category": "Technology"},
		{"club_name": "Literary Society", "description": "Book discussions and creative writing", "category": "Academic"},
		{"club_name": "Sports Club", "description": "Sports tournaments and fitness sessions", "category": "Sports"},
	]
	for c in clubs:
		doc = frappe.new_doc("Club")
		doc.update(c)
		doc.insert(ignore_permissions=True)

	events = [
		{"event_name": "Annual Tech Fest 2026", "club": "Computer Science Club", "event_date": "2026-03-15", "event_time": "09:00", "location": "Main Auditorium", "capacity": 500, "status": "Upcoming"},
		{"event_name": "Coding Workshop", "club": "Computer Science Club", "event_date": "2026-02-28", "event_time": "14:00", "location": "Lab 3", "capacity": 60, "status": "Upcoming"},
		{"event_name": "Photography Contest", "club": "Photography Club", "event_date": "2026-03-05", "event_time": "11:00", "location": "Art Gallery", "capacity": 80, "status": "Upcoming"},
	]
	for e in events:
		doc = frappe.new_doc("Event")
		doc.update(e)
		doc.insert(ignore_permissions=True)

	frappe.db.commit()
	frappe.msgprint("Club Manager seed data created.")


def _seed_demo_users():
	"""Create demo users for Club Manager login."""
	for u in DEMO_USERS:
		if frappe.db.exists("User", u["email"]):
			doc = frappe.get_doc("User", u["email"])
			if u["role"] == "admin":
				doc.add_roles("System Manager")
			elif u["role"] == "coordinator":
				doc.add_roles("Blogger", "Club Coordinator")
			else:
				doc.add_roles("Blogger")
			doc.save(ignore_permissions=True)
			continue
		doc = frappe.get_doc({
			"doctype": "User",
			"email": u["email"],
			"first_name": u["full_name"].split()[0],
			"last_name": " ".join(u["full_name"].split()[1:]) if len(u["full_name"].split()) > 1 else "",
			"enabled": 1,
			"new_password": u["password"],
			"user_type": "System User",
		})
		doc.flags.ignore_permissions = True
		doc.flags.no_welcome_mail = True
		doc.flags.ignore_password_policy = True
		doc.insert()
		if u["role"] == "admin":
			doc.add_roles("System Manager")
		elif u["role"] == "coordinator":
			doc.add_roles("Blogger", "Club Coordinator")
		else:
			doc.add_roles("Blogger")
