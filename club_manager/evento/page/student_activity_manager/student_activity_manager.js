frappe.pages["student-activity-manager"].on_page_load = function (wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: "Student Activity Manager — GECW",
		single_column: true,
	});

	page.set_primary_action(__("New Activity"), () => {
		frappe.new_doc("Student Activity");
	}, "add");

	page.set_secondary_action(__("Refresh"), () => {
		sam.refresh();
	});

	const sam = new StudentActivityManager(page);
	sam.refresh();
};

class StudentActivityManager {
	constructor(page) {
		this.page = page;
		this.wrapper = $(page.body);
		this.filters = {};
		this.setup_filters();
		this.render_layout();
	}

	setup_filters() {
		this.page.add_field({
			label: __("Department"),
			fieldtype: "Select",
			fieldname: "department",
			options: [
				"",
				"Computer Science & Engineering",
				"Electronics & Communication",
				"Electrical & Electronics",
				"Mechanical Engineering",
				"Civil Engineering",
				"Information Technology",
				"Artificial Intelligence & Data Science",
			],
			change: () => this.refresh(),
		});

		this.page.add_field({
			label: __("Activity Type"),
			fieldtype: "Link",
			fieldname: "activity_type",
			options: "Activity Type",
			change: () => this.refresh(),
		});

		this.page.add_field({
			label: __("Status"),
			fieldtype: "Select",
			fieldname: "status",
			options: ["", "Planned", "In Progress", "Completed", "Cancelled"],
			change: () => this.refresh(),
		});

		this.page.add_field({
			label: __("Semester"),
			fieldtype: "Select",
			fieldname: "semester",
			options: ["", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
			change: () => this.refresh(),
		});
	}

	get_filters() {
		const filters = {};
		const dept = this.page.fields_dict.department?.get_value();
		const type = this.page.fields_dict.activity_type?.get_value();
		const status = this.page.fields_dict.status?.get_value();
		const semester = this.page.fields_dict.semester?.get_value();

		if (dept) filters.department = dept;
		if (type) filters.activity_type = type;
		if (status) filters.status = status;
		if (semester) filters.semester = semester;

		return filters;
	}

	render_layout() {
		this.wrapper.html(`
			<div class="sam-container">
				<div class="sam-header">
					<div class="sam-college-banner">
						<h2>GECW — Student Activity Tracker</h2>
						<p>Government Engineering College for Women — Track, manage, and celebrate student achievements</p>
					</div>
				</div>
				<div class="sam-stats-row" id="sam-stats"></div>
				<div class="sam-charts-row">
					<div class="sam-chart-card" id="sam-type-chart"></div>
					<div class="sam-chart-card" id="sam-dept-chart"></div>
				</div>
				<div class="sam-section">
					<div class="sam-section-header">
						<h3>Recent Activities</h3>
						<a class="btn btn-xs btn-default" href="/app/student-activity">View All</a>
					</div>
					<div id="sam-activity-list"></div>
				</div>
				<div class="sam-section">
					<div class="sam-section-header">
						<h3>Top Achievers</h3>
					</div>
					<div id="sam-achievers"></div>
				</div>
			</div>
		`);
	}

	async refresh() {
		const filters = this.get_filters();
		await Promise.all([
			this.load_stats(filters),
			this.load_activities(filters),
			this.load_type_chart(filters),
			this.load_dept_chart(filters),
			this.load_achievers(filters),
		]);
	}

	async load_stats(filters) {
		const container = this.wrapper.find("#sam-stats");
		try {
			const total = await frappe.xcall(
				"frappe.client.get_count",
				{ doctype: "Student Activity", filters }
			);
			const completed = await frappe.xcall(
				"frappe.client.get_count",
				{ doctype: "Student Activity", filters: { ...filters, status: "Completed" } }
			);
			const this_month_filters = {
				...filters,
				activity_date: [">=", frappe.datetime.month_start()],
			};
			const this_month = await frappe.xcall(
				"frappe.client.get_count",
				{ doctype: "Student Activity", filters: this_month_filters }
			);
			const achievements = await frappe.xcall(
				"frappe.client.get_count",
				{
					doctype: "Student Activity",
					filters: { ...filters, achievement: ["!=", ""] },
				}
			);

			container.html(`
				${this.stat_card("Total Activities", total, "blue", "activity")}
				${this.stat_card("Completed", completed, "green", "check")}
				${this.stat_card("This Month", this_month, "orange", "calendar")}
				${this.stat_card("Achievements", achievements, "red", "star")}
			`);
		} catch {
			container.html(this.empty_state("No statistics available yet. Add some activities to get started!"));
		}
	}

	stat_card(label, value, color, icon) {
		return `
			<div class="sam-stat-card sam-stat-${color}">
				<div class="sam-stat-icon">
					${frappe.utils.icon(icon, "lg")}
				</div>
				<div class="sam-stat-content">
					<div class="sam-stat-value">${value || 0}</div>
					<div class="sam-stat-label">${label}</div>
				</div>
			</div>
		`;
	}

	async load_activities(filters) {
		const container = this.wrapper.find("#sam-activity-list");
		try {
			const activities = await frappe.xcall("frappe.client.get_list", {
				doctype: "Student Activity",
				filters,
				fields: [
					"name", "activity_title", "activity_type", "student_name",
					"department", "activity_date", "status", "achievement", "points",
				],
				order_by: "activity_date desc",
				limit_page_length: 20,
			});

			if (!activities.length) {
				container.html(this.empty_state("No activities found. Click <b>New Activity</b> to add one."));
				return;
			}

			const rows = activities.map((a) => `
				<tr class="sam-table-row" data-name="${a.name}" onclick="frappe.set_route('app/student-activity/${a.name}')">
					<td>
						<div class="sam-activity-name">${a.activity_title}</div>
						<div class="sam-activity-meta">${a.activity_type || ""}</div>
					</td>
					<td>${a.student_name}</td>
					<td><span class="sam-dept-badge">${this.short_dept(a.department)}</span></td>
					<td>${frappe.datetime.str_to_user(a.activity_date)}</td>
					<td><span class="sam-status-pill sam-status-${a.status?.toLowerCase().replace(/\s/g, "-")}">${a.status}</span></td>
					<td>${a.achievement ? `<span class="sam-achievement">${a.achievement}</span>` : "—"}</td>
					<td class="text-right">${a.points || 0}</td>
				</tr>
			`).join("");

			container.html(`
				<div class="sam-table-wrapper">
					<table class="sam-table">
						<thead>
							<tr>
								<th>Activity</th>
								<th>Student</th>
								<th>Dept</th>
								<th>Date</th>
								<th>Status</th>
								<th>Achievement</th>
								<th class="text-right">Points</th>
							</tr>
						</thead>
						<tbody>${rows}</tbody>
					</table>
				</div>
			`);
		} catch {
			container.html(this.empty_state("Could not load activities. Make sure the Student Activity DocType is installed."));
		}
	}

	async load_type_chart(filters) {
		const container = this.wrapper.find("#sam-type-chart");
		try {
			const data = await frappe.xcall("frappe.client.get_list", {
				doctype: "Student Activity",
				filters,
				fields: ["activity_type", "count(name) as count"],
				group_by: "activity_type",
				order_by: "count desc",
			});
			if (!data.length) {
				container.html(`<div class="sam-chart-empty"><h4>Activities by Type</h4><p class="text-muted">No data yet</p></div>`);
				return;
			}
			container.empty();
			const chart_wrapper = $('<div class="sam-chart-inner"></div>').appendTo(container);
			new frappe.Chart(chart_wrapper[0], {
				title: "Activities by Type",
				type: "donut",
				height: 280,
				data: {
					labels: data.map((d) => d.activity_type),
					datasets: [{ values: data.map((d) => d.count) }],
				},
				colors: ["#4F46E5", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"],
			});
		} catch {
			container.html(`<div class="sam-chart-empty"><h4>Activities by Type</h4><p class="text-muted">No data yet</p></div>`);
		}
	}

	async load_dept_chart(filters) {
		const container = this.wrapper.find("#sam-dept-chart");
		try {
			const data = await frappe.xcall("frappe.client.get_list", {
				doctype: "Student Activity",
				filters,
				fields: ["department", "count(name) as count"],
				group_by: "department",
				order_by: "count desc",
			});
			if (!data.length) {
				container.html(`<div class="sam-chart-empty"><h4>Activities by Department</h4><p class="text-muted">No data yet</p></div>`);
				return;
			}
			container.empty();
			const chart_wrapper = $('<div class="sam-chart-inner"></div>').appendTo(container);
			new frappe.Chart(chart_wrapper[0], {
				title: "Activities by Department",
				type: "bar",
				height: 280,
				data: {
					labels: data.map((d) => this.short_dept(d.department)),
					datasets: [{ name: "Activities", values: data.map((d) => d.count) }],
				},
				colors: ["#4F46E5"],
				barOptions: { spaceRatio: 0.4 },
			});
		} catch {
			container.html(`<div class="sam-chart-empty"><h4>Activities by Department</h4><p class="text-muted">No data yet</p></div>`);
		}
	}

	async load_achievers(filters) {
		const container = this.wrapper.find("#sam-achievers");
		try {
			const data = await frappe.xcall("frappe.client.get_list", {
				doctype: "Student Activity",
				filters: { ...filters, achievement: ["!=", ""], points: [">", 0] },
				fields: ["student_name", "student_id", "department", "sum(points) as total_points", "count(name) as activity_count"],
				group_by: "student_id",
				order_by: "total_points desc",
				limit_page_length: 8,
			});

			if (!data.length) {
				container.html(this.empty_state("No achievers yet. Record student achievements to see the leaderboard!"));
				return;
			}

			const cards = data.map((d, i) => `
				<div class="sam-achiever-card">
					<div class="sam-achiever-rank">#${i + 1}</div>
					<div class="sam-achiever-info">
						<div class="sam-achiever-name">${d.student_name}</div>
						<div class="sam-achiever-detail">${d.student_id} · ${this.short_dept(d.department)}</div>
					</div>
					<div class="sam-achiever-score">
						<div class="sam-achiever-points">${d.total_points}</div>
						<div class="sam-achiever-label">pts · ${d.activity_count} activities</div>
					</div>
				</div>
			`).join("");

			container.html(`<div class="sam-achievers-grid">${cards}</div>`);
		} catch {
			container.html(this.empty_state("No achievers data available yet."));
		}
	}

	short_dept(dept) {
		const map = {
			"Computer Science & Engineering": "CSE",
			"Electronics & Communication": "ECE",
			"Electrical & Electronics": "EEE",
			"Mechanical Engineering": "ME",
			"Civil Engineering": "CE",
			"Information Technology": "IT",
			"Artificial Intelligence & Data Science": "AI&DS",
		};
		return map[dept] || dept || "—";
	}

	empty_state(message) {
		return `
			<div class="sam-empty-state">
				<div class="sam-empty-icon">${frappe.utils.icon("file", "xl")}</div>
				<p>${message}</p>
			</div>
		`;
	}
}
