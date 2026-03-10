frappe.pages['club-manager-login'].on_page_load = function(wrapper) {
	wrapper._cm_login = new ClubManagerLogin(wrapper);
};

function ClubManagerLogin(wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true
	});
	page.main.css({ padding: '0', minHeight: '100vh', overflow: 'visible' });
	page.main.find('.page-head').hide();
	$(wrapper).css({ padding: '0', overflow: 'visible' });

	const html = `
		<div class="cm-login-page">
			<div class="bg-decoration">
				<div class="bg-circle c1"></div>
				<div class="bg-circle c2"></div>
				<div class="bg-circle c3"></div>
			</div>
			<div class="login-wrapper">
				<div class="brand-panel">
					<div class="brand-content">
						<div class="brand-logo"><div class="brand-icon">C</div></div>
						<h1>College Club<br />Manager</h1>
						<p>Activity Management &amp; Reporting System</p>
						<div class="brand-features">
							<div class="feature"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Member Onboarding &amp; Role Management</span></div>
							<div class="feature"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>Event Scheduling &amp; Registration</span></div>
							<div class="feature"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>Attendance Capture &amp; Notifications</span></div>
							<div class="feature"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span>Reports &amp; Analytics Dashboard</span></div>
						</div>
					</div>
				</div>
				<div class="form-panel">
					<div class="form-container">
						<div class="form-header">
							<div class="mobile-logo"><div class="brand-icon small">C</div><span>College Club Manager</span></div>
							<h2 id="cm-form-title">Welcome back</h2>
							<p id="cm-form-subtitle">Sign in to your account to continue</p>
						</div>
						<div id="cm-signin-view">
							<div class="quick-login">
								<p class="quick-label">Quick demo login:</p>
								<div class="quick-btns">
									<button type="button" class="quick-btn admin" data-role="admin"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>Admin</button>
									<button type="button" class="quick-btn coordinator" data-role="coordinator"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>Coordinator</button>
									<button type="button" class="quick-btn student" data-role="student"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>Student</button>
								</div>
							</div>
							<div class="divider"><span>or sign in with credentials</span></div>
							<form id="cm-login-form">
								<div class="form-group">
									<label>Email Address</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><input type="email" id="cm-email" placeholder="Enter your email" /></div>
								</div>
								<div class="form-group">
									<label>Password</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input type="password" id="cm-password" placeholder="Enter your password" /></div>
								</div>
								<button type="submit" class="btn-signin"><span class="btn-text">Sign In</span></button>
							</form>
							<p class="auth-switch">Don&apos;t have an account? <button type="button" class="auth-switch-btn" id="cm-signup-toggle">Sign Up</button></p>
							<div class="demo-credentials">
								<p class="demo-title">Demo Credentials</p>
								<div class="credentials-grid">
									<div class="cred-item"><span class="cred-role admin-dot">Admin</span><span>admin@college.edu</span></div>
									<div class="cred-item"><span class="cred-role coord-dot">Coordinator</span><span>michael@college.edu</span></div>
									<div class="cred-item"><span class="cred-role student-dot">Student</span><span>emily@college.edu</span></div>
									<div class="cred-item"><span class="cred-role">Password</span><span>password123</span></div>
								</div>
							</div>
						</div>
						<div id="cm-signup-view" style="display:none">
							<form id="cm-signup-form" onsubmit="return false;">
								<div class="form-group">
									<label>Full Name</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><input type="text" id="cm-signup-name" placeholder="Enter your full name" /></div>
								</div>
								<div class="form-group">
									<label>Email Address</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><input type="email" id="cm-signup-email" placeholder="Enter your email" /></div>
								</div>
								<div class="form-group">
									<label>Role</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg><select id="cm-signup-role"><option value="Student">Student</option><option value="Coordinator">Coordinator</option></select></div>
								</div>
								<div class="form-group">
									<label>Password</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><input type="password" id="cm-signup-password" placeholder="Create a password" /></div>
								</div>
								<div class="form-group">
									<label>Confirm Password</label>
									<div class="input-wrapper"><svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><input type="password" id="cm-signup-confirm" placeholder="Confirm your password" /></div>
								</div>
								<button type="button" class="btn-signin" id="cm-signup-btn"><span class="btn-text">Create Account</span></button>
							</form>
							<p class="auth-switch">Already have an account? <button type="button" class="auth-switch-btn" id="cm-signin-toggle">Sign In</button></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	const $el = $(html);
	page.main.append($el);

	frappe.call({ method: 'club_manager.api.ensure_demo_users', async: true });

	const DEMO_ROLE_MAP = {
		'admin@college.edu': 'admin', 'administrator': 'admin', 'administrator@example.com': 'admin',
		'michael@college.edu': 'coordinator', 'coordinator@college.edu': 'coordinator',
		'emily@college.edu': 'student', 'student@college.edu': 'student',
	};

	function doLogin(role) {
		sessionStorage.setItem('club_manager_role', role);
		frappe.show_alert({ message: __('Signing in as ' + role + '...'), indicator: 'blue' }, 2);
		window.location.href = '/app/club-manager-app';
	}

	function getRoleForEmail(email) {
		return DEMO_ROLE_MAP[(email || '').toLowerCase()] || 'student';
	}

	function submitLogin(usr, pwd, role, useBackendRole) {
		sessionStorage.setItem('club_manager_role', role);
		const args = { cmd: 'login', usr: usr, pwd: pwd };
		$.ajax({
			type: 'POST',
			url: '/login',
			data: args,
			dataType: 'json',
			headers: {
				'X-Frappe-CSRF-Token': (frappe && (frappe.csrf_token || (frappe.boot && frappe.boot.csrf_token))) || '',
				'Accept': 'application/json',
			},
			success: function(r) {
				if (r && r.message === 'Logged In') {
					window.location.href = '/app/club-manager-app';
				} else {
					const err = (r && r.exc && r.exc[0]) ? r.exc[0] : __('Invalid email or password');
					frappe.show_alert({ message: err, indicator: 'red' }, 4);
				}
			},
			error: function(xhr) {
				const r = xhr.responseJSON || {};
				const err = (r.exc && r.exc[0]) ? r.exc[0] : (r._server_messages ? JSON.parse(r._server_messages || '[]').map(function(m) { try { return JSON.parse(m).message; } catch(e) { return m; } }).join(' ') : __('Invalid email or password'));
				frappe.show_alert({ message: err, indicator: 'red' }, 4);
			}
		});
	}

	$el.on('click', '.quick-btn', function(e) {
		e.preventDefault();
		const role = $(e.currentTarget).data('role');
		const creds = { admin: ['admin@college.edu','password123'], coordinator: ['michael@college.edu','password123'], student: ['emily@college.edu','password123'] }[role];
		submitLogin(creds[0], creds[1], role, false);
		return false;
	});

	$el.on('submit', '#cm-login-form', function(e) {
		e.preventDefault();
		const email = $('#cm-email').val().trim().toLowerCase();
		const password = $('#cm-password').val();
		if (!email || !password) {
			frappe.show_alert({ message: __('Please enter email and password'), indicator: 'red' }, 3);
			return false;
		}
		const role = getRoleForEmail(email);
		const useBackendRole = !(email in DEMO_ROLE_MAP);
		submitLogin(email, password, role, useBackendRole);
		return false;
	});

	$el.on('click', '#cm-signup-toggle', function(e) {
		e.preventDefault();
		$('#cm-signin-view').hide();
		$('#cm-signup-view').show();
		$('#cm-form-title').text('Create Account');
		$('#cm-form-subtitle').text('Sign up to get started with Club Manager');
	});

	$el.on('click', '#cm-signin-toggle', function(e) {
		e.preventDefault();
		$('#cm-signup-view').hide();
		$('#cm-signin-view').show();
		$('#cm-form-title').text('Welcome back');
		$('#cm-form-subtitle').text('Sign in to your account to continue');
	});

	function doSignup() {
		const email = $('#cm-signup-email').val().trim().toLowerCase();
		const fullName = $('#cm-signup-name').val().trim();
		const password = $('#cm-signup-password').val();
		const confirm = $('#cm-signup-confirm').val();
		const role = ($('#cm-signup-role').val() || 'Student').toLowerCase();
		if (!email || !fullName) {
			frappe.show_alert({ message: __('Please enter email and full name'), indicator: 'red' }, 3);
			return;
		}
		const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRe.test(email)) {
			frappe.show_alert({ message: __('Please enter a valid email'), indicator: 'red' }, 3);
			return;
		}
		if (!password || password.length < 6) {
			frappe.show_alert({ message: __('Password must be at least 6 characters'), indicator: 'red' }, 3);
			return;
		}
		if (password !== confirm) {
			frappe.show_alert({ message: __('Passwords do not match'), indicator: 'red' }, 3);
			return;
		}
		frappe.call({
			method: 'club_manager.api.sign_up',
			args: { email: email, full_name: fullName, password: password, role: role },
			freeze: true,
			callback: function(r) {
				const msg = r && r.message;
				const success = msg && (msg.ok === true || msg.user);
				if (success) {
					frappe.msgprint({
						title: __('Success'),
						message: __('Account created! Signing you in...'),
						indicator: 'green'
					});
					$('#cm-signup-name, #cm-signup-email, #cm-signup-password, #cm-signup-confirm').val('');
					submitLogin(email, password, role, true);
				} else {
					const err = (r && r.exc && r.exc.length && r.exc[0]) ? r.exc[0] : __('Sign up failed.');
					frappe.msgprint({ title: __('Error'), message: err, indicator: 'red' });
				}
			}
		}).fail(function(xhr) {
			const resp = (xhr && xhr.responseJSON) || {};
			const err = (resp.exc && resp.exc[0]) ? resp.exc[0] : (resp._error_message || __('Sign up failed. Please try again.'));
			frappe.msgprint({ title: __('Error'), message: err, indicator: 'red' });
		});
	}

	$el.on('click', '#cm-signup-btn', doSignup);
	$el.on('submit', '#cm-signup-form', function(e) {
		e.preventDefault();
		doSignup();
	});
}
