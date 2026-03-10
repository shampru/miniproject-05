frappe.pages['club-manager-app'].on_page_load = function(wrapper) {
	wrapper._cm_app = new ClubManagerApp(wrapper);
};

frappe.pages['club-manager-app'].on_page_show = function(wrapper) {
	if (wrapper._cm_app && wrapper._cm_app.cmPage) {
		wrapper._cm_app.cmPage.show();
	}
};

frappe.pages['club-manager-app'].on_page_hide = function(wrapper) {
	if (wrapper._cm_app && wrapper._cm_app.cmPage) {
		wrapper._cm_app.cmPage.hide();
	}
};

// ═══════════════════════════════════════════════════════════
// SVG Icons
// ═══════════════════════════════════════════════════════════
const ICONS = {
	grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
	users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
	layers: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>',
	calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
	clipboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>',
	barChart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
	search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
	checkCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
	activity: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
	settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
	logout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
	plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
	edit: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
	trash: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
	download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
	refresh: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
	mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
	check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>',
	x: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
	file: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
	clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
	mapPin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
	userPlus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
	alert: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
	save: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
};

// ═══════════════════════════════════════════════════════════
// Palette & Gradients
// ═══════════════════════════════════════════════════════════
const AVATAR_COLORS = ['#4f46e5','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ef4444','#ec4899','#6366f1'];
const CLUB_GRADIENTS = [
	'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
	'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
	'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
	'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
	'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
	'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
	'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
	'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
];

// ═══════════════════════════════════════════════════════════
// Navigation Config
// ═══════════════════════════════════════════════════════════
const NAV_CONFIG = {
	admin: [
		{ label: 'Dashboard', icon: 'grid', route: 'admin/dashboard' },
		{ label: 'User Management', icon: 'users', route: 'admin/users' },
		{ label: 'Club Management', icon: 'layers', route: 'admin/clubs' },
		{ label: 'Reports', icon: 'barChart', route: 'admin/reports' },
	],
	coordinator: [
		{ label: 'Dashboard', icon: 'grid', route: 'coordinator/dashboard' },
		{ label: 'Event Management', icon: 'calendar', route: 'coordinator/events' },
		{ label: 'Registration', icon: 'clipboard', route: 'coordinator/registrations' },
		{ label: 'Attendance', icon: 'checkCircle', route: 'coordinator/attendance' },
		{ label: 'Reports', icon: 'barChart', route: 'coordinator/reports' },
	],
	student: [
		{ label: 'Dashboard', icon: 'grid', route: 'student/dashboard' },
		{ label: 'Browse Clubs', icon: 'search', route: 'student/browse-clubs' },
		{ label: 'Events', icon: 'calendar', route: 'student/events' },
		{ label: 'My Attendance', icon: 'checkCircle', route: 'student/my-attendance' },
		{ label: 'Activity History', icon: 'activity', route: 'student/activity-history' },
	],
};

// ═══════════════════════════════════════════════════════════
// Static Demo Data (reports, activity history - not in backend yet)
// ═══════════════════════════════════════════════════════════
const DEMO_RECENT_REPORTS = [
	{ id: 1, name: 'Monthly Event Summary', type: 'Event', date: '2026-03-01', format: 'PDF', status: 'Ready' },
	{ id: 2, name: 'Attendance Report - Feb', type: 'Attendance', date: '2026-02-28', format: 'Excel', status: 'Ready' },
	{ id: 3, name: 'Registration Analysis', type: 'Registration', date: '2026-02-25', format: 'PDF', status: 'Ready' },
	{ id: 4, name: 'Club Performance Q4', type: 'Performance', date: '2026-02-20', format: 'PDF', status: 'Ready' },
];

const DEMO_MY_ATTENDANCE = [
	{ id: 1, eventName: 'Annual Tech Fest 2026', date: '2026-03-15', club: 'CS Club', status: 'Present' },
	{ id: 2, eventName: 'Coding Workshop', date: '2026-02-28', club: 'CS Club', status: 'Present' },
	{ id: 3, eventName: 'Guest Lecture Series', date: '2026-01-20', club: 'CS Club', status: 'Late' },
	{ id: 4, eventName: 'Photography Contest', date: '2026-03-05', club: 'Photography Club', status: 'Present' },
	{ id: 5, eventName: 'Debate Championship', date: '2025-12-10', club: 'Debate Club', status: 'Absent' },
	{ id: 6, eventName: 'Robotics Workshop', date: '2026-01-10', club: 'Robotics Club', status: 'Present' },
	{ id: 7, eventName: 'Literary Meet', date: '2025-11-20', club: 'Literary Society', status: 'Present' },
	{ id: 8, eventName: 'Sports Day', date: '2025-10-15', club: 'Sports Club', status: 'Late' },
];

const DEMO_ACTIVITY_HISTORY = [
	{ id: 1, type: 'clubs', text: 'Joined <strong>Computer Science Club</strong>', time: '2 hours ago', date: 'Mar 7, 2026' },
	{ id: 2, type: 'events', text: 'Registered for <strong>Annual Tech Fest 2026</strong>', time: '5 hours ago', date: 'Mar 7, 2026' },
	{ id: 3, type: 'attendance', text: 'Marked present at <strong>Coding Workshop</strong>', time: '1 day ago', date: 'Mar 6, 2026' },
	{ id: 4, type: 'achievements', text: 'Earned <strong>Active Participant</strong> badge', time: '2 days ago', date: 'Mar 5, 2026' },
	{ id: 5, type: 'clubs', text: 'Joined <strong>Photography Club</strong>', time: '3 days ago', date: 'Mar 4, 2026' },
	{ id: 6, type: 'events', text: 'Attended <strong>Guest Lecture Series</strong>', time: '1 week ago', date: 'Feb 28, 2026' },
	{ id: 7, type: 'attendance', text: 'Late arrival at <strong>Guest Lecture Series</strong>', time: '2 weeks ago', date: 'Feb 21, 2026' },
	{ id: 8, type: 'achievements', text: 'Completed <strong>10 Events Milestone</strong>', time: '3 weeks ago', date: 'Feb 14, 2026' },
	{ id: 9, type: 'clubs', text: 'Left <strong>Drama Society</strong>', time: '1 month ago', date: 'Feb 7, 2026' },
	{ id: 10, type: 'events', text: 'Registered for <strong>Music Night</strong>', time: '1 month ago', date: 'Feb 1, 2026' },
];

// ═══════════════════════════════════════════════════════════
// Club Manager App Class
// ═══════════════════════════════════════════════════════════
class ClubManagerApp {

	constructor(wrapper) {
		this.$wrapper = $(wrapper);
		this.role = this.detectRole();
		this.currentModal = null;
		this.loading = true;
		this.state = {
			users: [],
			clubs: [],
			events: [],
			registrations: [],
			attendance: [],
			reports: JSON.parse(JSON.stringify(DEMO_RECENT_REPORTS)),
			myAttendance: [],
			studentRegistered: [],
			studentClubs: [],
			myCertificates: 0,
			selectedAttendanceEvent: null,
			attendanceLoadedForEvent: null,
		};
		this.currentRoute = `${this.role}/dashboard`;
		if (!sessionStorage.getItem('club_manager_role')) {
			frappe.set_route('club-manager-login');
			return;
		}
		this.init();
		window.__clubManagerApp = this;
		this.renderSidebar();
		this.mainContent.html('<div class="loading-state"><div class="btn-spinner"></div><p>Loading...</p></div>');
		this.loadData().then(() => {
			this.loading = false;
			this.navigate(this.currentRoute);
		});
	}

	// ── Load Data from API ───────────────────────────────
	loadData() {
		const promises = [];
		promises.push(frappe.call({ method: 'club_manager.api.get_clubs' }).then(r => {
			if (r.message) {
				this.state.clubs = (r.message || []).map(c => ({
					id: c.name,
					name: c.club_name || c.name,
					description: c.description || '',
					coordinator: c.coordinator_name || c.coordinator || '',
					coordinator_id: c.coordinator || '',
					members: c.members || c.member_count || 0,
					status: c.status || 'Active',
					created: c.creation ? String(c.creation).slice(0, 10) : '',
					category: c.category || 'Other',
				}));
			}
		}));
		promises.push(frappe.call({ method: 'club_manager.api.get_events' }).then(r => {
			if (r.message) {
				this.state.events = (r.message || []).map(e => ({
					id: e.name,
					name: e.event_name || e.name,
					description: e.description || '',
					date: e.date || e.event_date || '',
					time: (e.time || e.event_time || '09:00').toString().slice(0, 5),
					location: e.location || '',
					capacity: e.capacity || 100,
					registered: e.registered || e.registered_count || 0,
					status: e.status || 'Upcoming',
					club: e.club_name || e.club || '',
				}));
			}
		}));
		promises.push(frappe.call({ method: 'club_manager.api.get_users' }).then(r => {
			if (r.message) this.state.users = r.message || [];
		}));
		promises.push(frappe.call({ method: 'club_manager.api.get_registrations' }).then(r => {
			if (r.message) {
				this.state.registrations = (r.message || []).map(reg => ({
					id: reg.name,
					studentName: reg.studentName || reg.student || '',
					email: reg.email || '',
					eventName: reg.eventName || '',
					regDate: reg.regDate || '',
					status: reg.status || 'Pending',
				}));
			}
		}));
		if (this.role === 'student') {
			promises.push(frappe.call({ method: 'club_manager.api.get_my_clubs' }).then(r => {
				this.state.studentClubs = r.message || [];
			}));
			promises.push(frappe.call({ method: 'club_manager.api.get_my_registrations' }).then(r => {
				this.state.studentRegistered = r.message || [];
			}));
			promises.push(frappe.call({ method: 'club_manager.api.get_my_attendance' }).then(r => {
				this.state.myAttendance = r.message || [];
			}));
			promises.push(frappe.call({ method: 'club_manager.api.get_my_certificates' }).then(r => {
				this.state.myCertificates = r.message || 0;
			}));
		}
		return Promise.all(promises).catch(err => {
			frappe.show_alert({ message: 'Failed to load data', indicator: 'red' });
			console.error(err);
		});
	}

	refreshData(cb) {
		this.loadData().then(() => {
			if (cb) cb();
			else this.navigate(this.currentRoute);
		});
	}

	// ── Role Detection ──────────────────────────────────
	detectRole() {
		const stored = sessionStorage.getItem('club_manager_role');
		if (stored && ['admin', 'coordinator', 'student'].includes(stored)) return stored;
		if (frappe.user_roles && frappe.user_roles.includes('System Manager')) return 'admin';
		return 'student';
	}

	// ── Initialization ──────────────────────────────────
	init() {
		const cmPage = $(`
			<div class="cm-page">
				<div class="sidebar" id="cm-sidebar"></div>
				<div class="main-content" id="cm-main"></div>
			</div>
		`);
		this.$wrapper.empty().append(cmPage);
		this.cmPage = cmPage;
		this.sidebar = cmPage.find('#cm-sidebar');
		this.mainContent = cmPage.find('#cm-main');

		this.$wrapper.on('remove', () => {
			$(document).off('click.cmEvents input.cmEvents');
			cmPage.remove();
		});

		// Document-level delegation for Event Management (avoids overlay/z-index issues)
		$(document).off('click.cmEvents').on('click.cmEvents', '[data-cm-action]', (e) => {
			e.preventDefault();
			e.stopPropagation();
			const app = window.__clubManagerApp;
			if (!app) return;
			const $el = $(e.currentTarget);
			const action = $el.data('cmAction');
			const id = $el.data('cmId');
			const tab = $el.data('cmTab');
			if (action === 'create-event') app.showEventFormModal();
			else if (action === 'edit-event' && id) app.editEvent(id);
			else if (action === 'delete-event' && id) app.deleteEvent(id);
			else if (action === 'filter-tab' && tab) app.setEventTab(tab);
		});
		$(document).off('input.cmEvents').on('input.cmEvents', '#event-search', () => {
			const app = window.__clubManagerApp;
			if (app && app.currentRoute === 'coordinator/events') app.filterEventTable();
		});

		this.cmPage.on('click', 'a[href^="#"]', (e) => {
			const href = $(e.currentTarget).attr('href') || '';
			const route = href.replace(/^#/, '').split('?')[0];
			if (route && this.routeExists(route)) {
				e.preventDefault();
				e.stopPropagation();
				this.navigate(route);
			}
		});

		this.cmPage.on('click', '.logo, .sidebar-header', (e) => {
			e.preventDefault();
			frappe.set_route('club-manager-app');
		});

	}

	editEvent(id) {
		const ev = this.state.events.find(e => e.id === id);
		if (ev) this.showEventFormModal(ev);
	}

	deleteEvent(id) {
		const ev = this.state.events.find(e => e.id === id);
		if (ev) this.showDeleteModal('Event', ev.name, () => {
			frappe.call({ method: 'club_manager.api.delete_event', args: { name: id }, freeze: true }).then(r => {
				if (!r.exc) {
					frappe.show_alert({ message: 'Event deleted successfully', indicator: 'green' });
					this.refreshData(() => this.renderEventManagement());
				} else { frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Error', indicator: 'red' }); }
			});
		});
	}

	setEventTab(tab) {
		this._eventTab = tab;
		this.cmPage.find('.filter-tab').removeClass('active');
		this.cmPage.find(`.filter-tab[data-cm-tab="${tab}"]`).addClass('active');
		this._filterEventTable();
	}

	filterEventTable() {
		this._filterEventTable();
	}

	_filterEventTable() {
		const q = (this.cmPage.find('#event-search').val() || '').toLowerCase();
		const tab = this._eventTab || 'All';
		const filtered = this.state.events.filter(e => {
			const tabMatch = tab === 'All' || e.status === tab;
			const searchMatch = !q || (e.name || '').toLowerCase().includes(q);
			return tabMatch && searchMatch;
		});
		const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		const buildTable = (list) => list.length ? list.map(e => {
			const pct = Math.round((e.registered / e.capacity) * 100);
			const stCls = `badge-${e.status.toLowerCase()}`;
			const eid = esc(e.id);
			return `<tr><td><span class="student-name">${esc(e.name)}</span></td><td>${this.formatDate(e.date)} ${e.time}</td><td>${esc(e.location)}</td><td><div class="capacity-wrap"><div class="capacity-bar"><div class="capacity-fill ${this.capacityClass(pct)}" style="width:${pct}%"></div></div><span class="capacity-text">${e.registered}/${e.capacity}</span></div></td><td><span class="badge ${stCls}">${esc(e.status)}</span></td><td><div class="action-btns"><button type="button" class="action-btn edit" data-cm-action="edit-event" data-cm-id="${eid}">${ICONS.edit}</button><button type="button" class="action-btn delete" data-cm-action="delete-event" data-cm-id="${eid}">${ICONS.trash}</button></div></td></tr>`;
		}).join('') : `<tr><td colspan="6"><div class="table-empty"><p>No events found</p></div></td></tr>`;
		this.cmPage.find('#events-tbody').html(buildTable(filtered));
	}

	// ── Sidebar ─────────────────────────────────────────
	renderSidebar() {
		const items = NAV_CONFIG[this.role] || NAV_CONFIG.student;
		const fullName = frappe.session.user_fullname || 'Administrator';
		const email = frappe.session.user || 'admin@example.com';
		const initials = this.getInitials(fullName.split(' ')[0], fullName.split(' ')[1] || '');
		const color = this.getAvatarColor(fullName);

		this.sidebar.html(`
			<div class="sidebar-header">
				<div class="logo">
					<div class="logo-icon">C</div>
					<div class="logo-text">
						<h2>Club Manager</h2>
						<span>${this.role.charAt(0).toUpperCase() + this.role.slice(1)} Panel</span>
					</div>
				</div>
			</div>
			<div class="user-profile">
				<div class="avatar" style="background:${color};color:#fff">${initials}</div>
				<div class="user-info">
					<div class="user-name">${fullName}</div>
					<div class="user-email">${email}</div>
				</div>
			</div>
			<nav class="sidebar-nav">
				${items.map(item => `
					<div class="nav-item${this.currentRoute === item.route ? ' active' : ''}" data-route="${item.route}">
						${ICONS[item.icon]}<span>${item.label}</span>
					</div>
				`).join('')}
			</nav>
			<div class="sidebar-footer">
				<div class="nav-item" data-route="${this.role}/settings">
					${ICONS.settings}<span>Settings</span>
				</div>
				<button class="nav-item logout" id="cm-logout">
					${ICONS.logout}<span>Logout</span>
				</button>
			</div>
		`);

		this.sidebar.on('click', '[data-route]', (e) => {
			const route = $(e.currentTarget).data('route');
			this.navigate(route);
		});

		this.sidebar.on('click', '#cm-logout', () => {
			sessionStorage.removeItem('club_manager_role');
			window.location.href = '/app/club-manager-login';
		});
	}

	routeExists(route) {
		const valid = ['admin/dashboard','admin/users','admin/clubs','admin/reports','admin/settings','coordinator/dashboard','coordinator/events','coordinator/registrations','coordinator/attendance','coordinator/reports','coordinator/settings','student/dashboard','student/browse-clubs','student/events','student/my-attendance','student/activity-history','student/settings'];
		return valid.includes(route);
	}

	// ── Navigation ──────────────────────────────────────
	navigate(route) {
		this.currentRoute = route;
		this.sidebar.find('.nav-item').removeClass('active');
		this.sidebar.find(`[data-route="${route}"]`).addClass('active');

		const routeMap = {
			'admin/dashboard': () => this.renderAdminDashboard(),
			'admin/users': () => this.renderUserManagement(),
			'admin/clubs': () => this.renderClubManagement(),
			'admin/reports': () => this.renderReports('admin'),
			'admin/settings': () => this.renderSettings(),
			'coordinator/dashboard': () => this.renderCoordinatorDashboard(),
			'coordinator/events': () => this.renderEventManagement(),
			'coordinator/registrations': () => this.renderRegistrations(),
			'coordinator/attendance': () => this.renderAttendance(),
			'coordinator/reports': () => this.renderReports('coordinator'),
			'coordinator/settings': () => this.renderSettings(),
			'student/dashboard': () => this.renderStudentDashboard(),
			'student/browse-clubs': () => this.renderBrowseClubs(),
			'student/events': () => this.renderStudentEvents(),
			'student/my-attendance': () => this.renderMyAttendance(),
			'student/activity-history': () => this.renderActivityHistory(),
			'student/settings': () => this.renderSettings(),
		};
		const fn = routeMap[route];
		if (fn) {
			fn();
		} else {
			this.renderAdminDashboard();
		}
	}

	// ── Modal System ────────────────────────────────────
	showModal(title, bodyHtml, footerHtml, options = {}) {
		this.closeModal();
		const cls = options.small ? 'cm-dialog cm-dialog-sm' : 'cm-dialog';
		const overlay = $(`
			<div class="modal-overlay cm-modal-overlay">
				<div class="${cls}">
					<div class="modal-header">
						<h2>${title}</h2>
						<button type="button" class="modal-close">${ICONS.x}</button>
					</div>
					<div class="modal-body">${bodyHtml}</div>
					${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
				</div>
			</div>
		`);
		$('body').append(overlay);
		requestAnimationFrame(() => overlay.addClass('open'));
		overlay.on('click', '.modal-close', () => this.closeModal());
		overlay.on('click', (e) => { if ($(e.target).hasClass('modal-overlay')) this.closeModal(); });
		this.currentModal = overlay;
		return overlay;
	}

	closeModal() {
		if (this.currentModal) {
			this.currentModal.removeClass('open');
			const m = this.currentModal;
			setTimeout(() => m.remove(), 260);
			this.currentModal = null;
		}
	}

	// ── Utilities ───────────────────────────────────────
	formatDate(dateStr) {
		if (!dateStr) return '';
		return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
	}

	formatNumber(num) {
		return Number(num).toLocaleString();
	}

	getAvatarColor(name) {
		let h = 0;
		for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
		return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
	}

	getInitials(first, last) {
		return ((first || '')[0] || '') + ((last || '')[0] || '').toUpperCase();
	}

	capacityClass(pct) {
		if (pct >= 90) return 'high';
		if (pct >= 60) return 'mid';
		return 'low';
	}

	todayString() {
		return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	}

	// ═════════════════════════════════════════════════════
	// ADMIN VIEWS
	// ═════════════════════════════════════════════════════

	// ── Admin Dashboard ─────────────────────────────────
	renderAdminDashboard() {
		const sparkline = (pts, color) => `<svg viewBox="0 0 120 32" preserveAspectRatio="none"><defs><linearGradient id="sg-${color}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity=".2"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><polyline points="${pts} 120,32 0,32" fill="url(#sg-${color})" /><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

		const stats = [
			{ label: 'Total Users', value: '1,284', badge: '+12%', badgeCls: 'up', icon: 'users', iconCls: 'blue', spark: sparkline('0,28 20,22 40,25 60,15 80,18 100,8 120,12', 'var(--primary)') },
			{ label: 'Active Clubs', value: '28', badge: '+3', badgeCls: 'up', icon: 'layers', iconCls: 'purple', spark: sparkline('0,24 20,20 40,28 60,16 80,22 100,10 120,14', 'var(--purple)') },
			{ label: 'Events This Month', value: '45', badge: '+8%', badgeCls: 'up', icon: 'calendar', iconCls: 'green', spark: sparkline('0,30 20,26 40,22 60,28 80,14 100,18 120,8', 'var(--success)') },
			{ label: 'Total Attendance', value: '3,892', badge: '+15%', badgeCls: 'up', icon: 'checkCircle', iconCls: 'orange', spark: sparkline('0,26 20,30 40,20 60,24 80,12 100,16 120,6', 'var(--warning)') },
		];

		const barData = [
			{ month: 'Jan', created: 12, completed: 10 },
			{ month: 'Feb', created: 19, completed: 14 },
			{ month: 'Mar', created: 15, completed: 12 },
			{ month: 'Apr', created: 22, completed: 18 },
			{ month: 'May', created: 18, completed: 15 },
			{ month: 'Jun', created: 25, completed: 20 },
		];
		const barMax = 30;

		const lineData = [150, 220, 280, 250, 300, 350];
		const lineMax = 400;
		const lineMonths = ['Jan','Feb','Mar','Apr','May','Jun'];
		const linePoints = lineData.map((v, i) => `${(i / (lineData.length - 1)) * 100},${100 - (v / lineMax) * 100}`).join(' ');

		const activities = [
			{ icon: 'club', text: '<strong>Robotics Club</strong> added 5 new members', time: '10 minutes ago' },
			{ icon: 'event', text: '<strong>Annual Tech Fest</strong> registrations reached 432', time: '1 hour ago' },
			{ icon: 'user', text: '<strong>3 new students</strong> registered on the platform', time: '2 hours ago' },
			{ icon: 'attendance', text: 'Attendance marked for <strong>Coding Workshop</strong>', time: '3 hours ago' },
			{ icon: 'club', text: '<strong>Literary Society</strong> scheduled a new event', time: '5 hours ago' },
		];

		this.mainContent.off().html(`
			<div class="page-header">
				<div>
					<h1 class="page-title">Dashboard</h1>
					<p class="subtitle">Welcome back, Administrator</p>
				</div>
				<div class="header-right">
					<div class="date-display">${ICONS.calendar} ${this.todayString()}</div>
				</div>
			</div>

			<div class="stats-grid">
				${stats.map(s => `
					<div class="stat-card">
						<div class="stat-top">
							<div class="stat-icon ${s.iconCls}">${ICONS[s.icon]}</div>
							<span class="stat-badge ${s.badgeCls}">${s.badge}</span>
						</div>
						<div class="stat-row"><span class="stat-value">${s.value}</span></div>
						<span class="stat-label">${s.label}</span>
						<div class="stat-sparkline">${s.spark}</div>
					</div>
				`).join('')}
			</div>

			<div class="charts-grid">
				<div class="card">
					<div class="card-header">
						<h3>Events Overview</h3>
						<div class="chart-legend-inline">
							<span class="legend-inline"><span class="dot blue"></span>Created</span>
							<span class="legend-inline"><span class="dot green"></span>Completed</span>
						</div>
					</div>
					<div class="chart-container">
						<div class="y-axis">
							${[30,24,18,12,6,0].map(v => `<span class="y-label">${v}</span>`).join('')}
						</div>
						<div class="bar-chart">
							${barData.map(d => `
								<div class="bar-group">
									<div class="bars">
										<div class="bar created" style="height:${(d.created/barMax)*100}%" data-value="${d.created}"></div>
										<div class="bar completed" style="height:${(d.completed/barMax)*100}%" data-value="${d.completed}"></div>
									</div>
									<span class="bar-label">${d.month}</span>
								</div>
							`).join('')}
						</div>
					</div>
				</div>

				<div class="card">
					<div class="card-header">
						<h3>Attendance Trends</h3>
						<select class="period-select"><option>Last 6 months</option><option>Last year</option></select>
					</div>
					<div class="line-chart-container">
						<div class="y-axis">
							${[400,300,200,100,0].map(v => `<span class="y-label">${v}</span>`).join('')}
						</div>
						<div class="line-chart-wrapper">
							<svg class="line-chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
								<defs>
									<linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stop-color="var(--purple)" stop-opacity=".2"/>
										<stop offset="100%" stop-color="var(--purple)" stop-opacity="0"/>
									</linearGradient>
								</defs>
								${[25,50,75].map(y => `<line class="grid-line" x1="0" y1="${y}" x2="100" y2="${y}"/>`).join('')}
								<polygon class="chart-area-fill" points="${linePoints} 100,100 0,100"/>
								<polyline class="chart-line" points="${linePoints}"/>
								${lineData.map((v, i) => `<circle class="chart-dot" cx="${(i/(lineData.length-1))*100}" cy="${100-(v/lineMax)*100}" r="4"/>`).join('')}
							</svg>
							<div class="x-axis">
								${lineMonths.map(m => `<span class="x-label">${m}</span>`).join('')}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header">
					<h3>Recent Activities</h3>
					<a class="view-all-link" href="#admin/reports">View All</a>
				</div>
				<div class="activities-list">
					${activities.map(a => `
						<div class="activity-item">
							<div class="activity-icon ${a.icon}">${ICONS[a.icon === 'club' ? 'layers' : a.icon === 'event' ? 'calendar' : a.icon === 'user' ? 'users' : 'checkCircle']}</div>
							<div class="activity-body">
								<p class="activity-text">${a.text}</p>
								<span class="activity-time">${a.time}</span>
							</div>
						</div>
					`).join('')}
				</div>
			</div>
		`);
	}

	// ── User Management ─────────────────────────────────
	renderUserManagement() {
		const users = this.state.users;
		const active = users.filter(u => u.status === 'Active').length;
		const inactive = users.length - active;

		const buildTable = (list) => list.map(u => {
			const color = this.getAvatarColor(u.firstName + u.lastName);
			const init = this.getInitials(u.firstName, u.lastName);
			const roleCls = u.role === 'Student' ? 'role-student' : u.role === 'Coordinator' ? 'role-coordinator' : 'role-admin';
			const statusCls = u.status === 'Active' ? 'badge-active' : 'badge-inactive';
			return `<tr>
				<td><div class="user-cell"><div class="table-avatar" style="background:${color}">${init}</div><div><div class="name">${u.firstName} ${u.lastName}</div></div></div></td>
				<td>${u.email}</td>
				<td><span class="role-badge ${roleCls}">${u.role}</span></td>
				<td><span class="badge ${statusCls}">${u.status}</span></td>
				<td>${this.formatDate(u.joinDate)}</td>
				<td><div class="action-btns"><button class="action-btn edit" data-id="${u.id}">${ICONS.edit}</button><button class="action-btn delete" data-id="${u.id}">${ICONS.trash}</button></div></td>
			</tr>`;
		}).join('');

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">User Management</h1><p class="subtitle">Manage all users and their roles</p></div>
				<div class="header-right"><button class="btn btn-primary" id="add-user-btn">${ICONS.plus} Add User</button></div>
			</div>
			<div class="stats-row">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.users}</div><div class="stat-body"><span class="stat-value">${users.length}</span><span class="stat-label">Total Users</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${active}</span><span class="stat-label">Active</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.alert}</div><div class="stat-body"><span class="stat-value">${inactive}</span><span class="stat-label">Inactive</span></div></div>
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search users..." id="user-search"></div>
				<div class="filter-group">
					<select class="filter-select" id="role-filter"><option value="">All Roles</option><option value="Student">Student</option><option value="Coordinator">Coordinator</option><option value="Admin">Admin</option></select>
					<select class="filter-select" id="status-filter"><option value="">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
				</div>
			</div>
			<div class="table-container">
				<table><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Join Date</th><th>Actions</th></tr></thead>
				<tbody id="users-tbody">${buildTable(users)}</tbody></table>
			</div>
		`);

		const self = this;

		const filterUsers = () => {
			const q = $('#user-search').val().toLowerCase();
			const role = $('#role-filter').val();
			const status = $('#status-filter').val();
			const filtered = self.state.users.filter(u => {
				const nameMatch = (u.firstName + ' ' + u.lastName + ' ' + u.email).toLowerCase().includes(q);
				const roleMatch = !role || u.role === role;
				const statusMatch = !status || u.status === status;
				return nameMatch && roleMatch && statusMatch;
			});
			$('#users-tbody').html(buildTable(filtered));
		};

		this.mainContent.on('input', '#user-search', filterUsers);
		this.mainContent.on('change', '#role-filter, #status-filter', filterUsers);

		this.mainContent.on('click', '#add-user-btn', () => {
			self.showUserFormModal();
		});

		this.mainContent.on('click', '.action-btn.edit', function() {
			const id = $(this).data('id');
			const user = self.state.users.find(u => u.id === id);
			if (user) self.showUserFormModal(user);
		});

		this.mainContent.on('click', '.action-btn.delete', function() {
			const id = $(this).data('id');
			const user = self.state.users.find(u => u.id === id);
			if (user) self.showDeleteModal('User', user.firstName + ' ' + user.lastName, () => {
				frappe.call({ method: 'club_manager.api.delete_user', args: { email: user.email }, freeze: true }).then(r => {
					if (!r.exc) {
						frappe.show_alert({ message: 'User disabled successfully', indicator: 'green' });
						self.refreshData(() => self.renderUserManagement());
					} else if (r.exc) { frappe.show_alert({ message: (r.exc && r.exc[0]) || 'Error', indicator: 'red' }); }
				});
			});
		});
	}

	showUserFormModal(user) {
		const isEdit = !!user;
		const body = `
			<div class="form-row">
				<div class="form-group"><label>First Name</label><input type="text" class="form-input" id="m-firstName" value="${user ? user.firstName : ''}"></div>
				<div class="form-group"><label>Last Name</label><input type="text" class="form-input" id="m-lastName" value="${user ? user.lastName : ''}"></div>
			</div>
			<div class="form-group"><label>Email</label><input type="email" class="form-input" id="m-email" value="${user ? user.email : ''}" ${isEdit ? 'readonly' : ''}></div>
			${!isEdit ? '<div class="form-group"><label>Password</label><input type="password" class="form-input" id="m-password" placeholder="Min 6 characters"></div>' : ''}
			<div class="form-row">
				<div class="form-group"><label>Role</label><select class="form-select" id="m-role"><option value="Student" ${user && user.role==='Student'?'selected':''}>Student</option><option value="Coordinator" ${user && user.role==='Coordinator'?'selected':''}>Coordinator</option><option value="Admin" ${user && user.role==='Admin'?'selected':''}>Admin</option></select></div>
				<div class="form-group"><label>Status</label><select class="form-select" id="m-status"><option value="Active" ${user && user.status==='Active'?'selected':''}>Active</option><option value="Inactive" ${user && user.status==='Inactive'?'selected':''}>Inactive</option></select></div>
			</div>
		`;
		const footer = `<button class="btn btn-secondary modal-cancel-btn">Cancel</button><button class="btn btn-primary save-user-btn">${isEdit ? 'Update' : 'Add'} User</button>`;
		this.showModal(isEdit ? 'Edit User' : 'Add User', body, footer);

		const self = this;
		this.currentModal.on('click', '.modal-cancel-btn', () => self.closeModal());
		this.currentModal.on('click', '.save-user-btn', () => {
			const data = {
				firstName: $('#m-firstName').val().trim(),
				lastName: $('#m-lastName').val().trim(),
				email: $('#m-email').val().trim(),
				role: $('#m-role').val(),
				status: $('#m-status').val(),
			};
			if (!data.firstName || !data.email) {
				frappe.show_alert({ message: 'Please fill required fields', indicator: 'red' });
				return;
			}
			if (!isEdit && (!$('#m-password').val() || $('#m-password').val().length < 6)) {
				frappe.show_alert({ message: 'Password must be at least 6 characters', indicator: 'red' });
				return;
			}
			if (!isEdit) data.password = $('#m-password').val().trim();
			if (isEdit) {
				frappe.call({ method: 'club_manager.api.update_user', args: { email: user.email, data: data }, freeze: true }).then(r => {
					if (!r.exc) {
						frappe.show_alert({ message: 'User updated successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderUserManagement());
					} else if (r.exc) { frappe.show_alert({ message: (r.exc && r.exc[0]) || 'Error', indicator: 'red' }); }
				});
			} else {
				frappe.call({ method: 'club_manager.api.create_user', args: { data: data }, freeze: true }).then(r => {
					if (!r.exc && r.message) {
						frappe.show_alert({ message: 'User added successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderUserManagement());
					} else if (r.exc) { frappe.show_alert({ message: (r.exc && r.exc[0]) || 'Error', indicator: 'red' }); }
				});
			}
		});
	}

	showDeleteModal(type, name, onConfirm) {
		const body = `
			<div class="delete-icon-wrap" style="font-size:48px;color:var(--danger)">${ICONS.alert}</div>
			<p class="delete-text">Are you sure you want to delete <strong>${name}</strong>? This action cannot be undone.</p>
		`;
		const footer = `<button class="btn btn-secondary modal-cancel-btn">Cancel</button><button class="btn btn-danger confirm-delete-btn">Delete ${type}</button>`;
		this.showModal(`Delete ${type}`, body, footer, { small: true });
		this.currentModal.on('click', '.modal-cancel-btn', () => this.closeModal());
		this.currentModal.on('click', '.confirm-delete-btn', () => {
			this.closeModal();
			onConfirm();
		});
	}

	// ── Club Management ─────────────────────────────────
	renderClubManagement() {
		const clubs = this.state.clubs;
		const active = clubs.filter(c => c.status === 'Active').length;
		const inactive = clubs.length - active;

		const buildTable = (list) => list.map(c => {
			const statusCls = c.status === 'Active' ? 'badge-active' : 'badge-inactive';
			return `<tr>
				<td><span class="student-name">${c.name}</span></td>
				<td><span class="club-desc">${c.description}</span></td>
				<td>${c.coordinator}</td>
				<td>${c.members}</td>
				<td><span class="badge ${statusCls}">${c.status}</span></td>
				<td>${this.formatDate(c.created)}</td>
				<td><div class="action-btns"><button class="action-btn edit" data-id="${c.id}">${ICONS.edit}</button><button class="action-btn delete" data-id="${c.id}">${ICONS.trash}</button></div></td>
			</tr>`;
		}).join('');

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Club Management</h1><p class="subtitle">Manage all clubs and organizations</p></div>
				<div class="header-right"><button class="btn btn-primary" id="add-club-btn">${ICONS.plus} Add Club</button></div>
			</div>
			<div class="stats-row">
				<div class="stat-card"><div class="stat-icon purple">${ICONS.layers}</div><div class="stat-body"><span class="stat-value">${clubs.length}</span><span class="stat-label">Total Clubs</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${active}</span><span class="stat-label">Active</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.alert}</div><div class="stat-body"><span class="stat-value">${inactive}</span><span class="stat-label">Inactive</span></div></div>
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search clubs..." id="club-search"></div>
				<div class="filter-group">
					<select class="filter-select" id="club-status-filter"><option value="">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select>
				</div>
			</div>
			<div class="table-container">
				<table><thead><tr><th>Club Name</th><th>Description</th><th>Coordinator</th><th>Members</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
				<tbody id="clubs-tbody">${buildTable(clubs)}</tbody></table>
			</div>
		`);

		const self = this;

		const filterClubs = () => {
			const q = $('#club-search').val().toLowerCase();
			const status = $('#club-status-filter').val();
			const filtered = self.state.clubs.filter(c => {
				return (!q || (c.name + ' ' + c.coordinator).toLowerCase().includes(q)) && (!status || c.status === status);
			});
			$('#clubs-tbody').html(buildTable(filtered));
		};

		this.mainContent.on('input', '#club-search', filterClubs);
		this.mainContent.on('change', '#club-status-filter', filterClubs);

		this.mainContent.on('click', '#add-club-btn', () => self.showClubFormModal());

		this.mainContent.on('click', '.action-btn.edit', function() {
			const club = self.state.clubs.find(c => c.id === $(this).data('id'));
			if (club) self.showClubFormModal(club);
		});

		this.mainContent.on('click', '.action-btn.delete', function() {
			const club = self.state.clubs.find(c => c.id === $(this).data('id'));
			if (club) self.showDeleteModal('Club', club.name, () => {
				frappe.call({ method: 'club_manager.api.delete_club', args: { name: club.id }, freeze: true }).then(r => {
					if (!r.exc) {
						frappe.show_alert({ message: 'Club deleted successfully', indicator: 'green' });
						self.refreshData(() => self.renderClubManagement());
					} else { frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Error', indicator: 'red' }); }
				});
			});
		});
	}

	showClubFormModal(club) {
		const isEdit = !!club;
		const coordVal = club ? (club.coordinator_id || club.coordinator || '') : (this.role === 'coordinator' ? (frappe.session.user || '') : '');
		const coordOptions = this.state.users && this.state.users.length ? this.state.users.map(u => `<option value="${u.email}" ${u.email===coordVal?'selected':''}>${u.firstName} ${u.lastName} (${u.email})</option>`).join('') : '';
		const body = `
			<div class="form-group"><label>Club Name</label><input type="text" class="form-input" id="m-clubName" value="${club ? club.name : ''}"></div>
			<div class="form-group"><label>Description</label><textarea class="form-textarea" id="m-clubDesc">${club ? club.description : ''}</textarea></div>
			<div class="form-row">
				<div class="form-group"><label>Coordinator</label>
					${coordOptions ? `<select class="form-select" id="m-clubCoord"><option value="">-- Select --</option>${coordOptions}</select>` : `<input type="text" class="form-input" id="m-clubCoord" value="${coordVal}" placeholder="User email">`}
				</div>
				<div class="form-group"><label>Status</label><select class="form-select" id="m-clubStatus"><option value="Active" ${club && club.status==='Active'?'selected':''}>Active</option><option value="Inactive" ${club && club.status==='Inactive'?'selected':''}>Inactive</option></select></div>
			</div>
		`;
		const footer = `<button class="btn btn-secondary modal-cancel-btn">Cancel</button><button class="btn btn-primary save-club-btn">${isEdit ? 'Update' : 'Add'} Club</button>`;
		this.showModal(isEdit ? 'Edit Club' : 'Add Club', body, footer);

		const self = this;
		this.currentModal.on('click', '.modal-cancel-btn', () => self.closeModal());
		this.currentModal.on('click', '.save-club-btn', () => {
			const data = {
				club_name: $('#m-clubName').val().trim(),
				description: $('#m-clubDesc').val().trim(),
				coordinator: $('#m-clubCoord').val().trim() || null,
				status: $('#m-clubStatus').val(),
			};
			if (!data.club_name) { frappe.show_alert({ message: 'Please enter a club name', indicator: 'red' }); return; }
			if (isEdit) {
				frappe.call({ method: 'club_manager.api.update_club', args: { name: club.id, data: data }, freeze: true }).then(r => {
					if (!r.exc) {
						frappe.show_alert({ message: 'Club updated successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderClubManagement());
					} else if (r.exc) { frappe.show_alert({ message: (r.exc && r.exc[0]) || 'Error', indicator: 'red' }); }
				});
			} else {
				frappe.call({ method: 'club_manager.api.create_club', args: { data: data }, freeze: true }).then(r => {
					if (!r.exc && r.message) {
						frappe.show_alert({ message: 'Club added successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderClubManagement());
					} else if (r.exc) { frappe.show_alert({ message: (r.exc && r.exc[0]) || 'Error', indicator: 'red' }); }
				});
			}
		});
	}

	// ── Reports (Admin & Coordinator) ───────────────────
	renderReports(role) {
		const reports = this.state.reports;
		const reportCards = [
			{ title: 'Event Report', desc: 'Summary of all events, registrations, and outcomes for the selected period.', iconCls: 'event-icon-bg', icon: 'calendar', type: 'Event' },
			{ title: 'Attendance Report', desc: 'Detailed attendance records across all events and clubs.', iconCls: 'attendance-icon-bg', icon: 'checkCircle', type: 'Attendance' },
			{ title: 'Registration Report', desc: 'Student registration trends and approval statistics.', iconCls: 'registration-icon-bg', icon: 'clipboard', type: 'Registration' },
			{ title: 'Performance Report', desc: 'Club and coordinator performance metrics and analytics.', iconCls: 'performance-icon-bg', icon: 'barChart', type: 'Performance' },
		];

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Reports</h1><p class="subtitle">Generate and view reports</p></div>
				<div class="header-right"><div class="date-display">${ICONS.calendar} ${this.todayString()}</div></div>
			</div>
			<div class="stats-row">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.file}</div><div class="stat-body"><span class="stat-value">${reports.length}</span><span class="stat-label">Total Reports</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">3</span><span class="stat-label">Generated This Month</span></div></div>
				<div class="stat-card"><div class="stat-icon purple">${ICONS.clock}</div><div class="stat-body"><span class="stat-value">2.4s</span><span class="stat-label">Avg Generation Time</span></div></div>
			</div>
			<div class="report-cards-grid">
				${reportCards.map(r => `
					<div class="report-card">
						<div class="report-card-icon ${r.iconCls}">${ICONS[r.icon]}</div>
						<h4 class="report-card-title">${r.title}</h4>
						<p class="report-card-desc">${r.desc}</p>
						<button class="btn btn-primary btn-sm generate-report-btn" data-type="${r.type}">Generate Report</button>
					</div>
				`).join('')}
			</div>
			<div class="table-card">
				<div class="table-header"><span class="table-title">Recent Reports</span></div>
				<div class="table-responsive">
					<table class="data-table"><thead><tr><th>Report Name</th><th>Type</th><th>Date</th><th>Format</th><th>Actions</th></tr></thead>
					<tbody id="reports-tbody">
						${reports.map(r => `<tr>
							<td><span class="report-name">${r.name}</span></td>
							<td><span class="badge badge-${r.type.toLowerCase()}">${r.type}</span></td>
							<td>${this.formatDate(r.date)}</td>
							<td>${r.format}</td>
							<td><button class="btn-download download-btn" data-id="${r.id}">${ICONS.download} Download</button></td>
						</tr>`).join('')}
					</tbody></table>
				</div>
			</div>
		`);

		const self = this;

		this.mainContent.on('click', '.generate-report-btn', function() {
			const type = $(this).data('type');
			self.showGenerateReportModal(type);
		});

		this.mainContent.on('click', '.download-btn', function() {
			const id = $(this).data('id');
			const report = self.state.reports.find(r => String(r.id) === String(id));
			if (report && report.content) {
				try {
					const bin = atob(report.content);
					const bytes = new Uint8Array(bin.length);
					for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
					const blob = new Blob([bytes], { type: 'text/csv' });
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = report.filename || `${report.type}_Report.csv`;
					a.click();
					URL.revokeObjectURL(url);
					frappe.show_alert({ message: 'Download started', indicator: 'green' });
				} catch (e) {
					frappe.show_alert({ message: 'Download failed', indicator: 'red' });
				}
			} else {
				frappe.call({ method: 'club_manager.api.generate_report', args: { report_type: 'Event', from_date: '2026-02-01', to_date: new Date().toISOString().split('T')[0], format: 'CSV' } }).then(r => {
					if (!r.exc && r.message && r.message.content) {
						const msg = r.message;
						const bin = atob(msg.content);
						const bytes = new Uint8Array(bin.length);
						for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
						const blob = new Blob([bytes], { type: 'text/csv' });
						const url = URL.createObjectURL(blob);
						const a = document.createElement('a');
						a.href = url;
						a.download = msg.filename || 'Report.csv';
						a.click();
						URL.revokeObjectURL(url);
						frappe.show_alert({ message: 'Download started', indicator: 'green' });
					}
				});
			}
		});
	}

	showGenerateReportModal(type) {
		const body = `
			<div class="form-group"><label>Report Type</label><select class="form-select" id="m-reportType">
				<option value="Event" ${type==='Event'?'selected':''}>Event Report</option>
				<option value="Attendance" ${type==='Attendance'?'selected':''}>Attendance Report</option>
				<option value="Registration" ${type==='Registration'?'selected':''}>Registration Report</option>
				<option value="Performance" ${type==='Performance'?'selected':''}>Performance Report</option>
			</select></div>
			<div class="form-row">
				<div class="form-group"><label>From Date</label><input type="date" class="form-input" id="m-fromDate" value="2026-02-01"></div>
				<div class="form-group"><label>To Date</label><input type="date" class="form-input" id="m-toDate" value="2026-03-07"></div>
			</div>
			<div class="form-group"><label>Format</label>
				<div class="format-options">
					<label class="format-option"><input type="radio" name="format" value="PDF" checked><span class="format-label">${ICONS.file} PDF</span></label>
					<label class="format-option"><input type="radio" name="format" value="Excel"><span class="format-label">${ICONS.file} Excel</span></label>
					<label class="format-option"><input type="radio" name="format" value="CSV"><span class="format-label">${ICONS.file} CSV</span></label>
				</div>
			</div>
		`;
		const footer = `<button class="btn btn-secondary modal-cancel-btn">Cancel</button><button class="btn btn-primary gen-btn">Generate</button>`;
		this.showModal('Generate Report', body, footer);
		const self = this;
		this.currentModal.on('click', '.modal-cancel-btn', () => self.closeModal());
		this.currentModal.on('click', '.gen-btn', () => {
			const rType = $('#m-reportType').val();
			const fromDate = $('#m-fromDate').val() || '2026-02-01';
			const toDate = $('#m-toDate').val() || new Date().toISOString().split('T')[0];
			const fmt = $('input[name="format"]:checked').val();
			self.currentModal.find('.modal-body').html(`<div class="generate-loading"><div class="btn-spinner" style="width:32px;height:32px;border:3px solid var(--gray-200);border-top-color:var(--primary);border-radius:50%;display:inline-block"></div><p class="loading-text">Generating report...</p></div>`);
			self.currentModal.find('.modal-footer').hide();
			frappe.call({ method: 'club_manager.api.generate_report', args: { report_type: rType, from_date: fromDate, to_date: toDate, format: fmt }, freeze: true }).then(r => {
				if (!r.exc && r.message) {
					const msg = r.message;
					const newReport = { id: msg.id, name: msg.name, type: msg.type, date: msg.date, format: msg.format, status: 'Ready', content: msg.content, filename: msg.filename };
					self.state.reports.unshift(newReport);
					self.closeModal();
					frappe.show_alert({ message: 'Report generated successfully', indicator: 'green' });
					self.renderReports(self.role === 'admin' ? 'admin' : 'coordinator');
				}
			}).fail(() => {
				frappe.show_alert({ message: 'Report generation failed', indicator: 'red' });
				self.closeModal();
				self.renderReports(self.role === 'admin' ? 'admin' : 'coordinator');
			});
		});
	}

	// ═════════════════════════════════════════════════════
	// COORDINATOR VIEWS
	// ═════════════════════════════════════════════════════

	// ── Coordinator Dashboard ───────────────────────────
	renderCoordinatorDashboard() {
		const upcomingCount = this.state.events.filter(e => e.status === 'Upcoming').length;
		const totalReg = this.state.registrations.length;
		const completed = this.state.events.filter(e => e.status === 'Completed').length;

		const present = 156, absent = 24, late = 20, total = 200;
		const pct = Math.round((present / total) * 100);
		const circ = 2 * Math.PI * 80;
		const pLen = (present / total) * circ;
		const aLen = (absent / total) * circ;
		const lLen = (late / total) * circ;
		const aOff = -pLen;
		const lOff = -(pLen + aLen);

		const upcoming = this.state.events.filter(e => e.status === 'Upcoming');

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Coordinator Dashboard</h1><p class="subtitle">Manage events and track performance</p></div>
				<div class="header-right"><div class="date-display">${ICONS.calendar} ${this.todayString()}</div></div>
			</div>

			<div class="stats-grid">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.calendar}</div><div class="stat-body"><span class="stat-value">${upcomingCount}</span><span class="stat-label">Upcoming Events</span></div></div>
				<div class="stat-card"><div class="stat-icon purple">${ICONS.clipboard}</div><div class="stat-body"><span class="stat-value">${totalReg}</span><span class="stat-label">Registrations</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${completed}</span><span class="stat-label">Completed</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.activity}</div><div class="stat-body"><span class="stat-value">${pct}%</span><span class="stat-label">Attendance Rate</span></div></div>
			</div>

			<div class="charts-grid">
				<div class="card">
					<div class="card-header"><h3>Attendance Overview</h3></div>
					<div class="chart-area">
						<div class="donut-chart">
							<svg class="donut-svg" viewBox="0 0 200 200">
								<circle class="donut-bg" cx="100" cy="100" r="80"/>
								<circle class="donut-segment present" cx="100" cy="100" r="80" stroke-dasharray="${pLen} ${circ - pLen}" stroke-dashoffset="0"/>
								<circle class="donut-segment absent" cx="100" cy="100" r="80" stroke-dasharray="${aLen} ${circ - aLen}" stroke-dashoffset="${aOff}"/>
								<circle class="donut-segment late" cx="100" cy="100" r="80" stroke-dasharray="${lLen} ${circ - lLen}" stroke-dashoffset="${lOff}"/>
							</svg>
							<div class="donut-center"><span class="donut-percent">${pct}%</span><span class="donut-label">Present</span></div>
						</div>
						<div class="chart-legend">
							<div class="legend-item"><div class="legend-dot present"></div><div class="legend-text"><span class="legend-label">Present</span><span class="legend-value">${present}</span></div></div>
							<div class="legend-item"><div class="legend-dot absent"></div><div class="legend-text"><span class="legend-label">Absent</span><span class="legend-value">${absent}</span></div></div>
							<div class="legend-item"><div class="legend-dot late"></div><div class="legend-text"><span class="legend-label">Late</span><span class="legend-value">${late}</span></div></div>
						</div>
					</div>
				</div>

				<div class="card">
					<div class="card-header"><h3>Quick Actions</h3></div>
					<div class="quick-actions-grid">
						<button class="quick-action-btn" data-action="create-event"><div class="qa-icon blue">${ICONS.plus}</div>Create Event</button>
						<button class="quick-action-btn" data-action="attendance"><div class="qa-icon green">${ICONS.checkCircle}</div>Mark Attendance</button>
						<button class="quick-action-btn" data-action="reports"><div class="qa-icon purple">${ICONS.barChart}</div>View Reports</button>
						<button class="quick-action-btn" data-action="registrations"><div class="qa-icon orange">${ICONS.clipboard}</div>Manage Registrations</button>
					</div>
					<div class="notifications-section">
						<h4>Notifications</h4>
						<div class="notification-list">
							<div class="notification-item"><div class="notif-dot blue"></div><div class="notif-content"><p>5 new registrations for <strong>Tech Fest</strong></p><span>10 minutes ago</span></div></div>
							<div class="notification-item"><div class="notif-dot green"></div><div class="notif-content"><p>Attendance report ready for download</p><span>1 hour ago</span></div></div>
							<div class="notification-item"><div class="notif-dot orange"></div><div class="notif-content"><p>Photography Contest starts tomorrow</p><span>3 hours ago</span></div></div>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<div class="card-header"><h3>Upcoming Events</h3><a class="view-all-link" href="#coordinator/events">View All</a></div>
				<div class="events-list">
					${upcoming.map(e => {
						const pct = Math.round((e.registered / e.capacity) * 100);
						const d = new Date(e.date);
						const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
						const day = d.getDate();
						return `<div class="event-row">
							<div class="event-date-badge"><span class="month">${month}</span><span class="day">${day}</span></div>
							<div class="event-details">
								<div class="event-name">${e.name}</div>
								<div class="event-meta">
									<span class="event-meta-item">${ICONS.clock} ${e.time}</span>
									<span class="event-meta-item">${ICONS.mapPin} ${e.location}</span>
								</div>
							</div>
							<div class="event-registration">
								<span class="registration-text"><span class="current">${e.registered}</span> / ${e.capacity}</span>
								<div class="progress-bar"><div class="progress-fill ${this.capacityClass(pct)}" style="width:${pct}%"></div></div>
							</div>
						</div>`;
					}).join('')}
				</div>
			</div>
		`);

		this.mainContent.on('click', '.quick-action-btn', (e) => {
			const action = $(e.currentTarget).data('action');
			const routes = { 'create-event': 'coordinator/events', 'attendance': 'coordinator/attendance', 'reports': 'coordinator/reports', 'registrations': 'coordinator/registrations' };
			if (routes[action]) this.navigate(routes[action]);
		});
	}

	// ── Event Management ────────────────────────────────
	renderEventManagement() {
		const events = this.state.events;
		const statusCounts = { All: events.length, Upcoming: 0, Ongoing: 0, Completed: 0, Cancelled: 0 };
		events.forEach(e => { if (statusCounts[e.status] !== undefined) statusCounts[e.status]++; });

		const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		const buildTable = (list) => list.length ? list.map(e => {
			const pct = Math.round((e.registered / e.capacity) * 100);
			const stCls = `badge-${e.status.toLowerCase()}`;
			const eid = esc(e.id);
			return `<tr>
				<td><span class="student-name">${esc(e.name)}</span></td>
				<td>${this.formatDate(e.date)} ${e.time}</td>
				<td>${esc(e.location)}</td>
				<td><div class="capacity-wrap"><div class="capacity-bar"><div class="capacity-fill ${this.capacityClass(pct)}" style="width:${pct}%"></div></div><span class="capacity-text">${e.registered}/${e.capacity}</span></div></td>
				<td><span class="badge ${stCls}">${esc(e.status)}</span></td>
				<td><div class="action-btns"><button type="button" class="action-btn edit" data-cm-action="edit-event" data-cm-id="${eid}">${ICONS.edit}</button><button type="button" class="action-btn delete" data-cm-action="delete-event" data-cm-id="${eid}">${ICONS.trash}</button></div></td>
			</tr>`;
		}).join('') : `<tr><td colspan="6"><div class="table-empty"><p>No events found</p></div></td></tr>`;

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Event Management</h1><p class="subtitle">Create and manage events</p></div>
				<div class="header-right"><button type="button" class="btn btn-primary" id="add-event-btn" data-cm-action="create-event">${ICONS.plus} Create Event</button></div>
			</div>
			<div class="stats-grid">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.calendar}</div><div class="stat-body"><span class="stat-value">${events.length}</span><span class="stat-label">Total Events</span></div></div>
				<div class="stat-card"><div class="stat-icon purple">${ICONS.calendar}</div><div class="stat-body"><span class="stat-value">${statusCounts.Upcoming}</span><span class="stat-label">Upcoming</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.activity}</div><div class="stat-body"><span class="stat-value">${statusCounts.Ongoing}</span><span class="stat-label">Ongoing</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${statusCounts.Completed}</span><span class="stat-label">Completed</span></div></div>
			</div>
			<div class="filter-tabs" id="event-tabs">
				${['All','Upcoming','Ongoing','Completed','Cancelled'].map(t => `<button type="button" class="filter-tab${t==='All'?' active':''}" data-cm-action="filter-tab" data-cm-tab="${t}">${t}</button>`).join('')}
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search events..." id="event-search"></div>
			</div>
			<div class="table-container">
				<table><thead><tr><th>Event Name</th><th>Date & Time</th><th>Location</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
				<tbody id="events-tbody">${buildTable(events)}</tbody></table>
			</div>
		`);

		this._eventTab = 'All';
	}

	showEventFormModal(ev) {
		const isEdit = !!ev;
		const defaultDate = new Date().toISOString().split('T')[0];
		const clubOptions = this.state.clubs.map(c => `<option value="${c.id}" ${ev && (ev.club===c.name || ev.club===c.id)?'selected':''}>${c.name}</option>`).join('');
		const body = `
			<div class="form-group"><label>Event Name</label><input type="text" class="form-input" id="m-evName" value="${ev ? ev.name : ''}" placeholder="Enter event name"></div>
			<div class="form-group"><label>Description</label><textarea class="form-textarea" id="m-evDesc">${ev ? ev.description : ''}</textarea></div>
			<div class="form-group"><label>Club</label><select class="form-select" id="m-evClub"><option value="">-- Select --</option>${clubOptions}</select></div>
			<div class="form-row">
				<div class="form-group"><label>Date</label><input type="date" class="form-input" id="m-evDate" value="${ev ? ev.date : defaultDate}" required></div>
				<div class="form-group"><label>Time</label><input type="time" class="form-input" id="m-evTime" value="${ev ? ev.time : '09:00'}"></div>
			</div>
			<div class="form-group"><label>Location</label><input type="text" class="form-input" id="m-evLocation" value="${ev ? ev.location : ''}"></div>
			<div class="form-row">
				<div class="form-group"><label>Capacity</label><input type="number" class="form-input" id="m-evCapacity" value="${ev ? ev.capacity : ''}"></div>
				<div class="form-group"><label>Status</label><select class="form-select" id="m-evStatus">
					${['Upcoming','Ongoing','Completed','Cancelled'].map(s => `<option value="${s}" ${ev && ev.status===s?'selected':''}>${s}</option>`).join('')}
				</select></div>
			</div>
		`;
		const footer = `<button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button><button type="button" class="btn btn-primary save-event-btn">${isEdit ? 'Update' : 'Create'} Event</button>`;
		this.showModal(isEdit ? 'Edit Event' : 'Create Event', body, footer);
		const self = this;
		this.currentModal.on('click', '.modal-cancel-btn', () => self.closeModal());
		this.currentModal.on('click', '.save-event-btn', () => {
			const m = this.currentModal;
			const data = {
				event_name: (m.find('#m-evName').val() || '').trim(),
				description: (m.find('#m-evDesc').val() || '').trim(),
				club: m.find('#m-evClub').val() || null,
				event_date: m.find('#m-evDate').val(),
				event_time: m.find('#m-evTime').val(),
				location: (m.find('#m-evLocation').val() || '').trim(),
				capacity: parseInt(m.find('#m-evCapacity').val(), 10) || 100,
				status: m.find('#m-evStatus').val(),
			};
			if (!data.event_name) { frappe.show_alert({ message: 'Please enter an event name', indicator: 'red' }); return; }
			if (!data.event_date) { frappe.show_alert({ message: 'Please select a date', indicator: 'red' }); return; }
			if (isEdit) {
				frappe.call({ method: 'club_manager.api.update_event', args: { name: ev.id, data: data }, freeze: true }).then(r => {
					if (!r.exc) {
						frappe.show_alert({ message: 'Event updated successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderEventManagement());
					} else { frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Error', indicator: 'red' }); }
				});
			} else {
				frappe.call({ method: 'club_manager.api.create_event', args: { data: data }, freeze: true }).then(r => {
					if (!r.exc && r.message) {
						frappe.show_alert({ message: 'Event created successfully', indicator: 'green' });
						self.closeModal();
						self.refreshData(() => self.renderEventManagement());
					} else { frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Error', indicator: 'red' }); }
				});
			}
		});
	}

	// ── Registration ────────────────────────────────────
	renderRegistrations() {
		const regs = this.state.registrations;
		const approved = regs.filter(r => r.status === 'Approved').length;
		const pending = regs.filter(r => r.status === 'Pending').length;
		const rejected = regs.filter(r => r.status === 'Rejected').length;

		const buildTable = (list) => list.length ? list.map(r => {
			const stCls = `badge-${r.status.toLowerCase()}`;
			const isPending = r.status === 'Pending';
			const init = (r.studentName || '').split(' ').map(n=>n[0]).join('').toUpperCase() || '?';
			return `<tr>
				<td><div class="user-cell"><div class="table-avatar" style="background:${this.getAvatarColor(r.studentName)}">${init}</div><div><div class="student-name">${r.studentName}</div><div class="student-email">${r.email || ''}</div></div></div></td>
				<td>${r.eventName}</td>
				<td>${this.formatDate(r.regDate)}</td>
				<td><span class="badge ${stCls}">${r.status}</span></td>
				<td><div class="actions-cell">
					<button class="approve-btn" data-id="${r.id}" ${!isPending?'disabled':''}>${ICONS.check} Approve</button>
					<button class="reject-btn" data-id="${r.id}" ${!isPending?'disabled':''}>${ICONS.x} Reject</button>
				</div></td>
			</tr>`;
		}).join('') : `<tr><td colspan="5"><div class="table-empty"><p>No registrations found</p></div></td></tr>`;

		const eventNames = [...new Set(regs.map(r => r.eventName))];

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Registrations</h1><p class="subtitle">Manage event registrations</p></div>
			</div>
			<div class="stats-grid">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.clipboard}</div><div class="stat-body"><span class="stat-value">${regs.length}</span><span class="stat-label">Total</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${approved}</span><span class="stat-label">Approved</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.clock}</div><div class="stat-body"><span class="stat-value">${pending}</span><span class="stat-label">Pending</span></div></div>
				<div class="stat-card"><div class="stat-icon" style="background:var(--danger-light);color:var(--danger)">${ICONS.x}</div><div class="stat-body"><span class="stat-value">${rejected}</span><span class="stat-label">Rejected</span></div></div>
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search registrations..." id="reg-search"></div>
				<div class="filter-group">
					<select class="filter-select" id="reg-event-filter"><option value="">All Events</option>${eventNames.map(n=>`<option value="${n}">${n}</option>`).join('')}</select>
					<select class="filter-select" id="reg-status-filter"><option value="">All Status</option><option value="Approved">Approved</option><option value="Pending">Pending</option><option value="Rejected">Rejected</option></select>
				</div>
			</div>
			<div class="table-container">
				<table><thead><tr><th>Student</th><th>Event</th><th>Reg Date</th><th>Status</th><th>Actions</th></tr></thead>
				<tbody id="reg-tbody">${buildTable(regs)}</tbody></table>
			</div>
		`);

		const self = this;

		const filterRegs = () => {
			const q = $('#reg-search').val().toLowerCase();
			const ev = $('#reg-event-filter').val();
			const st = $('#reg-status-filter').val();
			const filtered = self.state.registrations.filter(r => {
				return (!q || (r.studentName + r.email).toLowerCase().includes(q)) && (!ev || r.eventName === ev) && (!st || r.status === st);
			});
			$('#reg-tbody').html(buildTable(filtered));
		};

		this.mainContent.on('input', '#reg-search', filterRegs);
		this.mainContent.on('change', '#reg-event-filter, #reg-status-filter', filterRegs);

		this.mainContent.on('click', '.approve-btn:not(:disabled)', function() {
			const reg = self.state.registrations.find(r => r.id === $(this).data('id'));
			if (reg) {
				frappe.call({ method: 'club_manager.api.update_registration', args: { name: reg.id, status: 'Approved' }, freeze: true }).then(r => {
					if (!r.exc) { frappe.show_alert({ message: 'Registration approved', indicator: 'green' }); self.refreshData(() => self.renderRegistrations()); }
				});
			}
		});
		this.mainContent.on('click', '.reject-btn:not(:disabled)', function() {
			const reg = self.state.registrations.find(r => r.id === $(this).data('id'));
			if (reg) {
				frappe.call({ method: 'club_manager.api.update_registration', args: { name: reg.id, status: 'Rejected' }, freeze: true }).then(r => {
					if (!r.exc) { frappe.show_alert({ message: 'Registration rejected', indicator: 'orange' }); self.refreshData(() => self.renderRegistrations()); }
				});
			}
		});
	}

	// ── Attendance ──────────────────────────────────────
	renderAttendance() {
		if (!this.state.selectedAttendanceEvent && this.state.events.length) {
			this.state.selectedAttendanceEvent = this.state.events[0].id;
		}
		const att = this.state.attendance;
		const selId = this.state.selectedAttendanceEvent;
		const selEvent = this.state.events.find(e => e.id === selId) || this.state.events[0];
		const needsLoad = selId && this.state.attendanceLoadedForEvent !== selId;

		const presentCount = att.filter(a => a.status === 'Present').length;
		const absentCount = att.filter(a => a.status === 'Absent').length;
		const lateCount = att.filter(a => a.status === 'Late').length;
		const rate = att.length ? Math.round((presentCount / att.length) * 100) : 0;

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Attendance</h1><p class="subtitle">Mark and manage event attendance</p></div>
				<div class="header-right">
					<button class="btn btn-secondary" id="mark-all-present">${ICONS.checkCircle} Mark All Present</button>
					<button class="btn btn-primary" id="save-attendance">${ICONS.save} Save</button>
				</div>
			</div>
			<div class="event-selector-card">
				<label class="selector-label">Select Event</label>
				<div class="selector-wrapper">
					<select class="event-select" id="attendance-event-select">
						${this.state.events.map(e => `<option value="${e.id}" ${e.id===selId?'selected':''}>${e.name}</option>`).join('')}
					</select>
				</div>
			</div>
			${selEvent ? `
			<div class="event-info-card">
				<div class="event-info-grid">
					<div class="event-info-item"><span class="event-info-label">Event</span><span class="event-info-value">${selEvent.name}</span></div>
					<div class="event-info-item"><span class="event-info-label">Date</span><span class="event-info-value">${this.formatDate(selEvent.date)}</span></div>
					<div class="event-info-item"><span class="event-info-label">Location</span><span class="event-info-value">${selEvent.location}</span></div>
					<div class="event-info-item"><span class="event-info-label">Registered</span><span class="event-info-value">${selEvent.registered}</span></div>
				</div>
			</div>` : ''}
			<div class="stats-grid">
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${presentCount}</span><span class="stat-label">Present</span></div></div>
				<div class="stat-card"><div class="stat-icon" style="background:var(--danger-light);color:var(--danger)">${ICONS.x}</div><div class="stat-body"><span class="stat-value">${absentCount}</span><span class="stat-label">Absent</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.clock}</div><div class="stat-body"><span class="stat-value">${lateCount}</span><span class="stat-label">Late</span></div></div>
				<div class="stat-card"><div class="stat-icon blue">${ICONS.activity}</div><div class="stat-body"><span class="stat-value">${rate}%</span><span class="stat-label">Attendance Rate</span></div></div>
			</div>
			<div class="table-container">
				<table><thead><tr><th>Student</th><th>Student ID</th><th>Status</th><th>Time Marked</th></tr></thead>
				<tbody>
					${att.map(a => {
						const stCls = a.status.toLowerCase();
						const init = (a.name || '').split(' ').map(n=>n[0]).join('') || '?';
						const sid = a.studentId || a.student || a.name;
						return `<tr>
							<td><div class="user-cell"><div class="table-avatar" style="background:${this.getAvatarColor(a.name)}">${init}</div><span class="student-name">${a.name}</span></div></td>
							<td>${sid}</td>
							<td><select class="status-select ${stCls}" data-id="${sid}">
								<option value="Present" ${a.status==='Present'?'selected':''}>Present</option>
								<option value="Absent" ${a.status==='Absent'?'selected':''}>Absent</option>
								<option value="Late" ${a.status==='Late'?'selected':''}>Late</option>
							</select></td>
							<td><span class="time-marked ${a.time!=='-'?'marked':''}">${a.time}</span></td>
						</tr>`;
					}).join('')}
				</tbody></table>
			</div>
		`);

		const self = this;

		this.mainContent.on('change', '#attendance-event-select', function() {
			self.state.selectedAttendanceEvent = $(this).val();
			self.loadAttendanceForEvent(self.state.selectedAttendanceEvent);
		});

		if (needsLoad) {
			this.loadAttendanceForEvent(selId);
		}

		this.mainContent.on('change', '.status-select', function() {
			const studentId = $(this).data('id');
			const val = $(this).val();
			const eventId = self.state.selectedAttendanceEvent;
			if (!eventId || !studentId) return;
			frappe.call({ method: 'club_manager.api.update_attendance', args: { event: eventId, student: studentId, status: val }, freeze: true }).then(r => {
				if (!r.exc) {
					const rec = self.state.attendance.find(a => a.studentId === studentId || a.name === studentId);
					if (rec) { rec.status = val; rec.time = val === 'Absent' ? '-' : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); }
					$(this).removeClass('present absent late').addClass(val.toLowerCase());
				}
			});
		});

		this.mainContent.on('click', '#mark-all-present', () => {
			const eventId = self.state.selectedAttendanceEvent;
			if (!eventId) return;
			const promises = self.state.attendance.map(a => {
				const sid = a.studentId || a.student || a.name;
				return frappe.call({ method: 'club_manager.api.update_attendance', args: { event: eventId, student: sid, status: 'Present' }, freeze: true });
			});
			Promise.all(promises).then(() => {
				frappe.show_alert({ message: 'All students marked present', indicator: 'green' });
				self.loadAttendanceForEvent(eventId);
			});
		});

		this.mainContent.on('click', '#save-attendance', () => {
			frappe.show_alert({ message: 'Attendance saved successfully', indicator: 'green' });
		});
	}

	loadAttendanceForEvent(eventId) {
		if (!eventId) return;
		const self = this;
		Promise.all([
			frappe.call({ method: 'club_manager.api.get_attendance', args: { event: eventId } }),
			frappe.call({ method: 'club_manager.api.get_registrations', args: { filters: JSON.stringify({ event: eventId }) } }),
		]).then(([attRes, regRes]) => {
			const attList = attRes.message || [];
			const regList = regRes.message || [];
			const attByStudent = {};
			attList.forEach(a => { attByStudent[a.student || a.studentId] = a; });
			const merged = regList.map(r => {
				const a = attByStudent[r.student];
				return {
					id: a ? a.name : r.name,
					name: r.studentName || r.student || '',
					studentId: r.student || '',
					status: a ? a.status : 'Pending',
					time: a && a.time !== '-' ? a.time : '-',
				};
			});
			self.state.attendance = merged;
			self.state.selectedAttendanceEvent = eventId;
			self.state.attendanceLoadedForEvent = eventId;
			self.renderAttendance();
		});
	}

	// ═════════════════════════════════════════════════════
	// STUDENT VIEWS
	// ═════════════════════════════════════════════════════

	// ── Student Dashboard ───────────────────────────────
	renderStudentDashboard() {
		const myClubIds = this.state.studentClubs;
		const myClubs = this.state.clubs.filter(c => myClubIds.includes(c.id));
		const regEvents = this.state.events.filter(e => this.state.studentRegistered.includes(e.id));
		const upcomingEvents = this.state.events.filter(e => e.status === 'Upcoming').slice(0, 3);

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Dashboard</h1><p class="subtitle">Welcome back, Student</p></div>
				<div class="header-right"><div class="date-display">${ICONS.calendar} ${this.todayString()}</div></div>
			</div>

			<div class="stats-grid">
				<div class="stat-card"><div class="stat-icon blue">${ICONS.layers}</div><div class="stat-body"><span class="stat-value">${myClubs.length}</span><span class="stat-label">Clubs Joined</span></div></div>
				<div class="stat-card"><div class="stat-icon purple">${ICONS.calendar}</div><div class="stat-body"><span class="stat-value">${regEvents.length}</span><span class="stat-label">Events Registered</span></div></div>
				<div class="stat-card"><div class="stat-icon green">${ICONS.checkCircle}</div><div class="stat-body"><span class="stat-value">${(this.state.myAttendance || []).length}</span><span class="stat-label">Events Attended</span></div></div>
				<div class="stat-card"><div class="stat-icon orange">${ICONS.file}</div><div class="stat-body"><span class="stat-value">${this.state.myCertificates || 0}</span><span class="stat-label">Certificates</span></div></div>
			</div>

			<div class="section">
				<div class="section-header"><h2>My Clubs</h2><a class="browse-link" href="#student/browse-clubs">${ICONS.search} Browse More</a></div>
				<div class="clubs-grid">
					${myClubs.map((c, i) => `
						<div class="club-card">
							<div class="club-banner" style="background:${CLUB_GRADIENTS[i % CLUB_GRADIENTS.length]}">
								<div class="club-banner-icon">${ICONS.layers}</div>
								<span class="club-badge member">Member</span>
							</div>
							<div class="club-body">
								<div class="club-name">${c.name}</div>
								<p class="club-description">${c.description}</p>
								<div class="club-meta">
									<span class="club-meta-item">${ICONS.users} ${c.members} members</span>
									<span class="club-meta-item">${ICONS.calendar} ${Math.floor(Math.random()*10)+3} events</span>
								</div>
							</div>
						</div>
					`).join('')}
				</div>
			</div>

			<div class="section">
				<div class="section-header"><h2>Upcoming Events</h2><a class="view-all-link" href="#student/events">View All</a></div>
				${upcomingEvents.map(e => {
					const d = new Date(e.date);
					const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
					const day = d.getDate();
					const isReg = this.state.studentRegistered.includes(e.id);
					const pct = Math.round((e.registered / e.capacity) * 100);
					return `<div class="event-card">
						<div class="event-date-block" style="background:var(--primary-light)">
							<span class="month" style="color:var(--primary)">${month}</span>
							<span class="day" style="color:var(--primary)">${day}</span>
						</div>
						<div class="event-info">
							<div class="event-name">${e.name}</div>
							<div class="event-club">${e.club || 'General'}</div>
							<div class="event-details-row">
								<span class="event-detail">${ICONS.clock} ${e.time}</span>
								<span class="event-detail">${ICONS.mapPin} ${e.location}</span>
							</div>
						</div>
						<div class="event-right">
							<div class="progress-bar" style="width:120px"><div class="progress-fill ${this.capacityClass(pct)}" style="width:${pct}%"></div></div>
							<span class="capacity-text">${e.registered}/${e.capacity}</span>
							${isReg
								? '<button class="event-btn registered">Registered</button>'
								: pct >= 100
									? '<button class="event-btn full">Full</button>'
									: `<button class="event-btn register student-register-btn" data-id="${e.id}">Register</button>`}
						</div>
					</div>`;
				}).join('')}
			</div>
		`);

		this.mainContent.on('click', '.student-register-btn', (ev) => {
			const eventId = $(ev.currentTarget).data('id');
			if (this.state.studentRegistered.includes(eventId)) return;
			frappe.call({ method: 'club_manager.api.register_for_event', args: { event: eventId }, freeze: true }).then(r => {
				if (!r.exc) {
					this.state.studentRegistered.push(eventId);
					frappe.show_alert({ message: 'Successfully registered!', indicator: 'green' });
					this.refreshData(() => this.renderStudentDashboard());
				} else {
					frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Registration failed', indicator: 'red' });
				}
			});
		});
	}

	// ── Browse Clubs ────────────────────────────────────
	renderBrowseClubs() {
		const categories = ['All', 'Technology', 'Arts', 'Sports', 'Academic', 'Cultural'];

		const buildCards = (list) => list.length ? list.map((c, i) => {
			const isMember = this.state.studentClubs.includes(c.id);
			return `<div class="club-card">
				<div class="club-banner" style="background:${CLUB_GRADIENTS[i % CLUB_GRADIENTS.length]}">
					<div class="club-banner-icon">${ICONS.layers}</div>
					<span class="club-badge ${isMember ? 'member' : 'open'}">${isMember ? 'Member' : 'Open'}</span>
				</div>
				<div class="club-body">
					<div class="club-name">${c.name}</div>
					<p class="club-description">${c.description}</p>
					<div class="club-stats">
						<span class="club-stat">${ICONS.users} ${c.members} members</span>
						<span class="club-stat">${ICONS.calendar} ${c.category}</span>
					</div>
					<div class="club-actions">
						${isMember
							? `<button class="btn btn-secondary leave-club-btn" data-id="${c.id}">Leave Club</button>`
							: c.status === 'Active'
								? `<button class="btn btn-primary join-club-btn" data-id="${c.id}">Join Club</button>`
								: `<button class="btn btn-gray" disabled>Inactive</button>`}
					</div>
				</div>
			</div>`;
		}).join('') : `<div class="no-results">${ICONS.search}<p>No clubs found matching your criteria</p></div>`;

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Browse Clubs</h1><p class="subtitle">Discover and join clubs</p></div>
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search clubs..." id="browse-search"></div>
			</div>
			<div class="category-filters" id="cat-filters">
				${categories.map(c => `<button class="filter-btn${c==='All'?' active':''}" data-cat="${c}">${c}</button>`).join('')}
			</div>
			<div class="clubs-grid" id="browse-clubs-grid">
				${buildCards(this.state.clubs)}
			</div>
		`);

		const self = this;
		let activeCat = 'All';

		const filterClubs = () => {
			const q = $('#browse-search').val().toLowerCase();
			const filtered = self.state.clubs.filter(c => {
				const catMatch = activeCat === 'All' || c.category === activeCat;
				const searchMatch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
				return catMatch && searchMatch;
			});
			$('#browse-clubs-grid').html(buildCards(filtered));
		};

		this.mainContent.on('input', '#browse-search', filterClubs);
		this.mainContent.on('click', '.filter-btn', function() {
			activeCat = $(this).data('cat');
			$('.filter-btn').removeClass('active');
			$(this).addClass('active');
			filterClubs();
		});

		this.mainContent.on('click', '.join-club-btn', function() {
			const clubId = $(this).data('id');
			if (self.state.studentClubs.includes(clubId)) return;
			frappe.call({ method: 'club_manager.api.join_club', args: { club: clubId }, freeze: true }).then(r => {
				if (!r.exc) {
					self.state.studentClubs.push(clubId);
					frappe.show_alert({ message: 'Club joined successfully!', indicator: 'green' });
					self.refreshData(() => self.renderBrowseClubs());
				} else {
					frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Join failed', indicator: 'red' });
				}
			});
		});

		this.mainContent.on('click', '.leave-club-btn', function() {
			const clubId = $(this).data('id');
			frappe.call({ method: 'club_manager.api.leave_club', args: { club: clubId }, freeze: true }).then(r => {
				if (!r.exc) {
					self.state.studentClubs = self.state.studentClubs.filter(cid => cid !== clubId);
					frappe.show_alert({ message: 'Left the club', indicator: 'orange' });
					self.refreshData(() => self.renderBrowseClubs());
				} else {
					frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Error', indicator: 'red' });
				}
			});
		});
	}

	// ── Student Events ──────────────────────────────────
	renderStudentEvents() {
		const tabs = ['All', 'Upcoming', 'Registered', 'Past'];

		const buildCards = (list) => list.length ? list.map(e => {
			const d = new Date(e.date);
			const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
			const day = d.getDate();
			const isReg = this.state.studentRegistered.includes(e.id);
			const pct = Math.round((e.registered / e.capacity) * 100);
			const isFull = pct >= 100;
			const isPast = e.status === 'Completed';

			let btnHtml;
			if (isPast) btnHtml = '<span class="event-badge completed">Completed</span>';
			else if (isReg) btnHtml = '<button class="event-btn registered">Registered</button>';
			else if (isFull) btnHtml = '<button class="event-btn full">Full</button>';
			else btnHtml = `<button class="event-btn register student-ev-register" data-id="${e.id}">Register</button>`;

			return `<div class="event-card">
				<div class="event-date-block" style="background:${isPast?'var(--gray-100)':'var(--primary-light)'}">
					<span class="month" style="color:${isPast?'var(--gray-500)':'var(--primary)'}">${month}</span>
					<span class="day" style="color:${isPast?'var(--gray-500)':'var(--primary)'}">${day}</span>
				</div>
				<div class="event-info">
					<div class="event-name">${e.name}</div>
					<div class="event-club">${e.club || 'General'}</div>
					<div class="event-details-row">
						<span class="event-detail">${ICONS.clock} ${e.time}</span>
						<span class="event-detail">${ICONS.mapPin} ${e.location}</span>
					</div>
				</div>
				<div class="event-right">
					<div class="progress-bar" style="width:120px"><div class="progress-fill ${this.capacityClass(pct)}" style="width:${Math.min(pct,100)}%"></div></div>
					<span class="capacity-text">${e.registered}/${e.capacity}</span>
					${btnHtml}
				</div>
			</div>`;
		}).join('') : `<div class="no-results">${ICONS.calendar}<p>No events found</p></div>`;

		const clubNames = [...new Set(this.state.events.map(e => e.club).filter(Boolean))];

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Events</h1><p class="subtitle">Browse and register for events</p></div>
			</div>
			<div class="tab-filters" id="event-tab-filters">
				${tabs.map(t => `<button class="tab-btn${t==='All'?' active':''}" data-tab="${t}">${t}</button>`).join('')}
			</div>
			<div class="toolbar">
				<div class="search-box">${ICONS.search}<input type="text" placeholder="Search events..." id="student-ev-search"></div>
				<div class="filter-group">
					<select class="filter-select" id="student-ev-club"><option value="">All Clubs</option>${clubNames.map(n=>`<option value="${n}">${n}</option>`).join('')}</select>
				</div>
			</div>
			<div id="student-events-list">
				${buildCards(this.state.events)}
			</div>
		`);

		const self = this;
		let activeTab = 'All';

		const filterEvents = () => {
			const q = $('#student-ev-search').val().toLowerCase();
			const club = $('#student-ev-club').val();
			const filtered = self.state.events.filter(e => {
				let tabMatch = true;
				if (activeTab === 'Upcoming') tabMatch = e.status === 'Upcoming' || e.status === 'Ongoing';
				else if (activeTab === 'Registered') tabMatch = self.state.studentRegistered.includes(e.id);
				else if (activeTab === 'Past') tabMatch = e.status === 'Completed';
				const searchMatch = !q || e.name.toLowerCase().includes(q);
				const clubMatch = !club || e.club === club;
				return tabMatch && searchMatch && clubMatch;
			});
			$('#student-events-list').html(buildCards(filtered));
		};

		this.mainContent.on('click', '.tab-btn', function() {
			activeTab = $(this).data('tab');
			$('.tab-btn').removeClass('active');
			$(this).addClass('active');
			filterEvents();
		});
		this.mainContent.on('input', '#student-ev-search', filterEvents);
		this.mainContent.on('change', '#student-ev-club', filterEvents);
		this.mainContent.on('click', '.student-ev-register', function() {
			const eventId = $(this).data('id');
			if (self.state.studentRegistered.includes(eventId)) return;
			frappe.call({ method: 'club_manager.api.register_for_event', args: { event: eventId }, freeze: true }).then(r => {
				if (!r.exc) {
					self.state.studentRegistered.push(eventId);
					frappe.show_alert({ message: 'Successfully registered!', indicator: 'green' });
					self.refreshData(() => self.renderStudentEvents());
				} else {
					frappe.show_alert({ message: r.exc && r.exc[0] ? r.exc[0] : 'Registration failed', indicator: 'red' });
				}
			});
		});
	}

	// ── My Attendance ───────────────────────────────────
	renderMyAttendance() {
		const records = this.state.myAttendance;
		const presentCount = records.filter(r => r.status === 'Present').length;
		const absentCount = records.filter(r => r.status === 'Absent').length;
		const lateCount = records.filter(r => r.status === 'Late').length;
		const total = records.length;
		const pctPresent = total ? Math.round((presentCount / total) * 100) : 0;
		const pctAbsent = total ? Math.round((absentCount / total) * 100) : 0;
		const pctLate = total ? Math.round((lateCount / total) * 100) : 0;

		const circ = 2 * Math.PI * 80;
		const pLen = (presentCount / total) * circ;
		const aLen = (absentCount / total) * circ;
		const lLen = (lateCount / total) * circ;

		const eventNames = [...new Set(records.map(r => r.eventName))];
		const clubs = [...new Set(records.map(r => r.club))];

		const buildTable = (list) => list.map(r => {
			const stCls = r.status.toLowerCase();
			return `<tr>
				<td><span class="student-name">${r.eventName}</span></td>
				<td>${this.formatDate(r.date)}</td>
				<td>${r.club}</td>
				<td><span class="status-badge ${stCls}">${r.status}</span></td>
			</tr>`;
		}).join('');

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">My Attendance</h1><p class="subtitle">Track your attendance across events</p></div>
			</div>

			<div class="chart-card">
				<h3 class="card-title">Attendance Overview</h3>
				<div class="donut-container">
					<div class="donut-chart">
						<svg class="donut-svg" viewBox="0 0 200 200">
							<circle class="donut-bg" cx="100" cy="100" r="80"/>
							<circle class="donut-segment present" cx="100" cy="100" r="80" stroke-dasharray="${pLen} ${circ - pLen}" stroke-dashoffset="0"/>
							<circle class="donut-segment absent" cx="100" cy="100" r="80" stroke-dasharray="${aLen} ${circ - aLen}" stroke-dashoffset="${-pLen}"/>
							<circle class="donut-segment late" cx="100" cy="100" r="80" stroke-dasharray="${lLen} ${circ - lLen}" stroke-dashoffset="${-(pLen + aLen)}"/>
						</svg>
						<div class="donut-center"><span class="donut-percent">${pctPresent}%</span><span class="donut-label">Present</span></div>
					</div>
					<div class="donut-legend">
						<div class="legend-item"><div class="legend-dot present"></div><div class="legend-text"><span class="legend-label">Present (${pctPresent}%)</span><span class="legend-value">${presentCount}</span></div></div>
						<div class="legend-item"><div class="legend-dot absent"></div><div class="legend-text"><span class="legend-label">Absent (${pctAbsent}%)</span><span class="legend-value">${absentCount}</span></div></div>
						<div class="legend-item"><div class="legend-dot late"></div><div class="legend-text"><span class="legend-label">Late (${pctLate}%)</span><span class="legend-value">${lateCount}</span></div></div>
					</div>
				</div>
			</div>

			<div class="filters-card">
				<div style="display:flex;gap:16px;flex-wrap:wrap">
					<div class="filter-group" style="flex:1;min-width:180px">
						<label>Event</label>
						<select class="filter-select" id="att-event-filter" style="width:100%"><option value="">All Events</option>${eventNames.map(n=>`<option value="${n}">${n}</option>`).join('')}</select>
					</div>
					<div class="filter-group" style="flex:1;min-width:180px">
						<label>Status</label>
						<select class="filter-select" id="att-status-filter" style="width:100%"><option value="">All Status</option><option value="Present">Present</option><option value="Absent">Absent</option><option value="Late">Late</option></select>
					</div>
				</div>
			</div>

			<table class="attendance-table">
				<thead><tr><th>Event</th><th>Date</th><th>Club</th><th>Status</th></tr></thead>
				<tbody id="my-att-tbody">${buildTable(records)}</tbody>
			</table>
		`);

		const self = this;
		const filterAtt = () => {
			const ev = $('#att-event-filter').val();
			const st = $('#att-status-filter').val();
			const filtered = self.state.myAttendance.filter(r => (!ev || r.eventName === ev) && (!st || r.status === st));
			$('#my-att-tbody').html(buildTable(filtered));
		};
		this.mainContent.on('change', '#att-event-filter, #att-status-filter', filterAtt);
	}

	// ── Activity History ────────────────────────────────
	renderActivityHistory() {
		const tabs = ['All', 'Clubs', 'Events', 'Attendance', 'Achievements'];
		const typeIcons = { clubs: ICONS.layers, events: ICONS.calendar, attendance: ICONS.checkCircle, achievements: ICONS.activity };

		const buildTimeline = (list) => list.length ? list.map(a => `
			<div class="timeline-item">
				<div class="timeline-dot ${a.type}">${typeIcons[a.type] || ICONS.activity}</div>
				<div class="timeline-card">
					<div class="timeline-card-top">
						<p class="timeline-description">${a.text}</p>
						<span class="timeline-badge ${a.type}">${a.type.charAt(0).toUpperCase() + a.type.slice(1)}</span>
					</div>
					<div class="timeline-time">${ICONS.clock} ${a.time} &middot; ${a.date}</div>
				</div>
			</div>
		`).join('') : `<div class="no-results"><p>No activities found</p></div>`;

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Activity History</h1><p class="subtitle">Your complete activity timeline</p></div>
			</div>
			<div class="filter-tabs" id="activity-tabs">
				${tabs.map(t => `<button class="filter-tab${t==='All'?' active':''}" data-tab="${t.toLowerCase()}">${t}</button>`).join('')}
			</div>
			<div class="timeline" id="activity-timeline">
				${buildTimeline(DEMO_ACTIVITY_HISTORY)}
			</div>
		`);

		this.mainContent.on('click', '.filter-tab', function() {
			const tab = $(this).data('tab');
			$('.filter-tab').removeClass('active');
			$(this).addClass('active');
			const filtered = tab === 'all' ? DEMO_ACTIVITY_HISTORY : DEMO_ACTIVITY_HISTORY.filter(a => a.type === tab);
			$('#activity-timeline').html(buildTimeline(filtered));
		});
	}

	// ═════════════════════════════════════════════════════
	// SHARED: Settings
	// ═════════════════════════════════════════════════════
	renderSettings() {
		const fullName = frappe.session.user_fullname || 'Administrator';
		const nameParts = fullName.split(' ');
		const firstName = nameParts[0] || '';
		const lastName = nameParts.slice(1).join(' ') || '';
		const email = frappe.session.user || 'admin@example.com';
		const roleLabel = this.role.charAt(0).toUpperCase() + this.role.slice(1);
		const color = this.getAvatarColor(fullName);
		const initials = this.getInitials(firstName, lastName);

		this.mainContent.off().html(`
			<div class="page-header">
				<div><h1 class="page-title">Settings</h1><p class="subtitle">Manage your account settings</p></div>
			</div>
			<div class="settings-grid">
				<div class="settings-card">
					<div class="settings-card-header"><h3>Profile Information</h3><p>Update your personal details</p></div>
					<div class="profile-avatar-section">
						<div class="profile-avatar" style="background:${color}">${initials}</div>
						<div>
							<div class="profile-avatar-name">${fullName}</div>
							<div class="profile-avatar-role">${roleLabel}</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group"><label>First Name</label><input type="text" class="form-input" id="s-firstName" value="${firstName}"></div>
						<div class="form-group"><label>Last Name</label><input type="text" class="form-input" id="s-lastName" value="${lastName}"></div>
					</div>
					<div class="form-group"><label>Email</label><input type="email" class="form-input" id="s-email" value="${email}"></div>
					<div class="form-group"><label>Role</label><input type="text" class="form-input" value="${roleLabel}" disabled></div>
					<div class="settings-actions"><button class="btn btn-primary" id="save-profile-btn">${ICONS.save} Save Changes</button></div>
				</div>
				<div class="settings-card">
					<div class="settings-card-header"><h3>Change Password</h3><p>Update your account password</p></div>
					<div class="form-group"><label>Current Password</label><input type="password" class="form-input" id="s-currentPw" placeholder="Enter current password"></div>
					<div class="form-group"><label>New Password</label><input type="password" class="form-input" id="s-newPw" placeholder="Enter new password"></div>
					<div class="form-group"><label>Confirm New Password</label><input type="password" class="form-input" id="s-confirmPw" placeholder="Confirm new password"></div>
					<div class="settings-actions"><button class="btn btn-primary" id="update-pw-btn">${ICONS.save} Update Password</button></div>
				</div>
			</div>
		`);

		this.mainContent.on('click', '#save-profile-btn', () => {
			frappe.show_alert({ message: 'Profile updated successfully', indicator: 'green' });
		});

		this.mainContent.on('click', '#update-pw-btn', () => {
			const newPw = $('#s-newPw').val();
			const confirmPw = $('#s-confirmPw').val();
			if (!$('#s-currentPw').val()) {
				frappe.show_alert({ message: 'Please enter current password', indicator: 'red' });
				return;
			}
			if (newPw !== confirmPw) {
				frappe.show_alert({ message: 'Passwords do not match', indicator: 'red' });
				return;
			}
			if (newPw.length < 6) {
				frappe.show_alert({ message: 'Password must be at least 6 characters', indicator: 'red' });
				return;
			}
			frappe.show_alert({ message: 'Password updated successfully', indicator: 'green' });
			$('#s-currentPw, #s-newPw, #s-confirmPw').val('');
		});
	}
}
