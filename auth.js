/* WEPL T&C Portal — login, users, roles, notifications (shared on this PC) */
(function (global) {
  'use strict';

  var AUTH_KEY = 'wepl-tnc-auth-v1';
  var SESS_KEY = 'wepl-tnc-session-v1';
  var DEFAULT_ADMIN_ID = 'Admin';
  var DEFAULT_ADMIN_PW = 'Admin';

  function uid() {
    return 'u-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
  }
  function nowIso() { return new Date().toISOString(); }

  function emptyStore() { return { users: [], notifications: [] }; }

  function normalizeStore(d) {
    if (!d || !Array.isArray(d.users)) return emptyStore();
    return {
      users: d.users,
      notifications: Array.isArray(d.notifications) ? d.notifications : []
    };
  }

  function loadLocal() {
    try {
      var raw = localStorage.getItem(AUTH_KEY);
      if (raw) return normalizeStore(JSON.parse(raw));
    } catch (e) { /* ignore */ }
    return emptyStore();
  }

  function userKey(u) {
    var s = String((u && u.staffId) || '').trim().toLowerCase();
    var e = String((u && u.email) || '').trim().toLowerCase();
    return s || e || String((u && u.id) || '');
  }

  function preferUser(a, b) {
    if (!a) return b;
    if (!b) return a;
    if (!!a.mustChangePassword !== !!b.mustChangePassword) {
      return a.mustChangePassword ? b : a;
    }
    return a;
  }

  function mergeStores(server, local) {
    server = normalizeStore(server);
    local = normalizeStore(local);
    var byKey = {};
    server.users.forEach(function (u) {
      var k = userKey(u);
      if (k) byKey[k] = u;
    });
    local.users.forEach(function (u) {
      var k = userKey(u);
      if (!k) return;
      byKey[k] = preferUser(byKey[k], u);
    });
    var notes = [];
    var seen = {};
    (server.notifications || []).concat(local.notifications || []).forEach(function (n) {
      if (!n || !n.id || seen[n.id]) return;
      seen[n.id] = 1;
      notes.push(n);
    });
    notes.sort(function (a, b) { return String(b.at || '').localeCompare(String(a.at || '')); });
    return {
      users: Object.keys(byKey).map(function (k) { return byKey[k]; }),
      notifications: notes.slice(0, 200)
    };
  }

  var store = emptyStore();
  var useServer = false;
  var saveChain = Promise.resolve();

  function saveAuth(d) {
    store = normalizeStore(d || store);
    try { localStorage.setItem(AUTH_KEY, JSON.stringify(store)); } catch (e) { /* ignore */ }
    if (!useServer) return Promise.resolve();
    saveChain = saveChain.then(function () {
      return fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
        cache: 'no-store'
      }).then(function (res) {
        if (!res.ok) throw new Error('Could not save shared login.');
      }).catch(function (err) {
        console.warn(err);
      });
    });
    return saveChain;
  }

  function hashPassword(pw) {
    var payload = 'wepl-tnc|' + String(pw || '');
    if (global.crypto && crypto.subtle && typeof TextEncoder !== 'undefined') {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload)).then(function (buf) {
        return Array.from(new Uint8Array(buf)).map(function (b) {
          return b.toString(16).padStart(2, '0');
        }).join('');
      });
    }
    var h = 5381;
    for (var i = 0; i < payload.length; i++) h = ((h << 5) + h) + payload.charCodeAt(i);
    return Promise.resolve('x' + (h >>> 0).toString(16));
  }

  function emptyUser(over) {
    return Object.assign({
      id: uid(),
      staffId: '',
      email: '',
      name: '',
      passwordHash: '',
      portalRole: 'tested',
      witnessRole: '',
      verifyRole: '',
      projectIds: [],
      docAssign: {},
      mustChangePassword: true,
      active: true,
      created: nowIso()
    }, over || {});
  }

  function fetchServerAuth() {
    return fetch('/api/auth', { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('no shared login');
      return res.json();
    }).then(function (d) {
      useServer = true;
      return normalizeStore(d);
    });
  }

  var ready = fetchServerAuth().catch(function () {
    useServer = false;
    return emptyStore();
  }).then(function (serverStore) {
    store = mergeStores(serverStore, loadLocal());
    return hashPassword(DEFAULT_ADMIN_PW);
  }).then(function (hash) {
    if (!store.users.length) {
      store.users.push(emptyUser({
        staffId: DEFAULT_ADMIN_ID,
        email: 'admin@winner-e.sg',
        name: 'Portal Administrator',
        passwordHash: hash,
        portalRole: 'admin',
        mustChangePassword: true
      }));
    }
    return saveAuth(store);
  }).then(function () { return store; });

  function findUser(login) {
    var q = String(login || '').trim().toLowerCase();
    return store.users.find(function (u) {
      return u.active !== false && (
        String(u.staffId || '').toLowerCase() === q ||
        String(u.email || '').toLowerCase() === q
      );
    }) || null;
  }

  function readSession() {
    try {
      var raw = localStorage.getItem(SESS_KEY) || sessionStorage.getItem(SESS_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.userId) return null;
      var u = store.users.find(function (x) { return x.id === s.userId && x.active !== false; });
      return u ? s : null;
    } catch (e) { return null; }
  }

  function writeSession(sess, remember) {
    localStorage.removeItem(SESS_KEY);
    sessionStorage.removeItem(SESS_KEY);
    if (!sess) return;
    var raw = JSON.stringify(sess);
    localStorage.setItem(SESS_KEY, raw);
    if (!remember) sessionStorage.setItem(SESS_KEY, raw);
  }

  function currentUser() {
    var s = readSession();
    if (!s) return null;
    return store.users.find(function (u) { return u.id === s.userId && u.active !== false; }) || null;
  }

  function login(loginId, password, remember) {
    return ready.then(function () {
      var u = findUser(loginId);
      if (!u) return { ok: false, error: 'Staff ID or work email was not found.' };
      return hashPassword(password).then(function (h) {
        if (h !== u.passwordHash) {
          var changed = String(u.staffId || '').toLowerCase() === DEFAULT_ADMIN_ID.toLowerCase() && !u.mustChangePassword;
          return {
            ok: false,
            error: changed
              ? 'Incorrect password. Type the same password that already works in Chrome. Do not use a saved browser password or the old default Admin password.'
              : 'Incorrect password.'
          };
        }
        writeSession({ userId: u.id, at: nowIso() }, !!remember);
        return { ok: true, user: u, mustChange: !!u.mustChangePassword };
      });
    });
  }

  function logout() {
    writeSession(null);
  }

  function changePassword(user, oldPw, newPw) {
    if (!user) return Promise.resolve({ ok: false, error: 'Not signed in.' });
    if (!newPw || String(newPw).length < 6) return Promise.resolve({ ok: false, error: 'New password must be at least 6 characters.' });
    if (String(newPw) === DEFAULT_ADMIN_PW && user.staffId === DEFAULT_ADMIN_ID) {
      return Promise.resolve({ ok: false, error: 'Choose a password other than the default Admin password.' });
    }
    return ready.then(function () {
      return hashPassword(oldPw).then(function (h) {
        if (h !== user.passwordHash) return { ok: false, error: 'Current password is incorrect.' };
        return hashPassword(newPw).then(function (nh) {
          user.passwordHash = nh;
          user.mustChangePassword = false;
          user.passwordHint = '';
          return saveAuth(store).then(function () { return { ok: true }; });
        });
      });
    });
  }

  function setPassword(user, newPw) {
    if (!newPw || String(newPw).length < 6) return Promise.resolve({ ok: false, error: 'Password must be at least 6 characters.' });
    return hashPassword(newPw).then(function (h) {
      user.passwordHash = h;
      user.mustChangePassword = true;
      return saveAuth(store).then(function () { return { ok: true }; });
    });
  }

  function createUser(fields) {
    var staffId = String((fields && fields.staffId) || '').trim();
    var email = String((fields && fields.email) || '').trim();
    if (!staffId && !email) return Promise.resolve({ ok: false, error: 'Staff ID or work email is required.' });
    if (findUser(staffId) || (email && findUser(email))) {
      return Promise.resolve({ ok: false, error: 'A user with that Staff ID or email already exists.' });
    }
    var u = emptyUser({
      staffId: staffId,
      email: email,
      name: (fields && fields.name) || staffId || email,
      portalRole: (fields && fields.portalRole) || 'tested',
      witnessRole: (fields && fields.witnessRole) || '',
      verifyRole: (fields && fields.verifyRole) || '',
      projectIds: (fields && fields.projectIds) || [],
      docAssign: (fields && fields.docAssign) || {},
      mustChangePassword: true
    });
    var pw = String((fields && fields.password) || '').trim() || staffId;
    if (!pw || pw.length <= 4) {
      return Promise.resolve({ ok: false, error: 'Password must be more than 4 characters. Enter a custom password or use a Staff ID longer than 4 characters.' });
    }
    u.passwordHint = pw;
    return hashPassword(pw).then(function (h) {
      u.passwordHash = h;
      store.users.push(u);
      return saveAuth(store).then(function () { return { ok: true, user: u }; });
    });
  }

  function updateUser(id, fields) {
    var u = store.users.find(function (x) { return x.id === id; });
    if (!u) return { ok: false, error: 'User not found.' };
    Object.keys(fields || {}).forEach(function (k) {
      if (k === 'passwordHash' || k === 'id') return;
      u[k] = fields[k];
    });
    saveAuth(store);
    return { ok: true, user: u };
  }

  function applyUserFields(id, fields) {
    var u = store.users.find(function (x) { return x.id === id; });
    if (!u) return false;
    Object.keys(fields || {}).forEach(function (k) {
      if (k === 'passwordHash' || k === 'id' || k === 'passwordHint') return;
      u[k] = fields[k];
    });
    return true;
  }

  function notify(n) {
    store.notifications = store.notifications || [];
    store.notifications.unshift({
      id: uid(),
      projectId: n.projectId || '',
      projectName: n.projectName || '',
      userId: n.userId || '',
      role: n.role || '',
      kind: n.kind || 'info',
      title: n.title || '',
      text: n.text || '',
      at: nowIso(),
      read: false
    });
    store.notifications = store.notifications.slice(0, 200);
    saveAuth(store);
  }

  function notifyMany(userIds, payload) {
    (userIds || []).forEach(function (id) {
      if (!id) return;
      notify(Object.assign({}, payload, { userId: id }));
    });
  }

  function inbox(user, projectId) {
    var uid_ = user && user.id;
    return (store.notifications || []).filter(function (n) {
      if (n.userId && n.userId !== uid_) return false;
      if (projectId && n.projectId !== projectId) return false;
      if (!n.userId && n.role && user && n.role !== user.portalRole) return false;
      if (!n.userId && !n.role) return n.userId === uid_;
      return true;
    });
  }

  function unreadCount(user, projectId) {
    return inbox(user, projectId).filter(function (n) { return !n.read; }).length;
  }

  function markRead(id) {
    var n = (store.notifications || []).find(function (x) { return x.id === id; });
    if (n) { n.read = true; saveAuth(store); }
  }
  function markProjectRead(user, projectId) {
    inbox(user, projectId).forEach(function (n) { n.read = true; });
    saveAuth(store);
  }

  function canNav(user, navId) {
    if (!user) return false;
    if (user.portalRole === 'admin') return true;
    if (user.portalRole === 'tested') return navId !== 'admin';
    var allowed = { dashboard: 1, 'project-tnc': 1, progress: 1, 'close-out': 1 };
    return !!allowed[navId];
  }

  function canProject(user, projectId) {
    if (!user) return false;
    if (user.portalRole === 'admin' || user.portalRole === 'tested') return true;
    return (user.projectIds || []).indexOf(projectId) >= 0;
  }

  function usersForProject(projectId, role) {
    return store.users.filter(function (u) {
      if (u.active === false) return false;
      if (role && u.portalRole !== role) return false;
      if (u.portalRole === 'admin' || u.portalRole === 'tested') return true;
      return (u.projectIds || []).indexOf(projectId) >= 0;
    });
  }

  function roleLabel(u) {
    if (!u) return '';
    if (u.portalRole === 'admin') return 'Admin';
    if (u.portalRole === 'tested') return 'Tested By';
    if (u.portalRole === 'witness') {
      var w = { coordinator: 'Site Coordinator', engineer: 'Site Engineer', pm: 'Site Project Manager' };
      return 'Witness By' + (w[u.witnessRole] ? ' · ' + w[u.witnessRole] : '');
    }
    if (u.portalRole === 'verify') {
      var v = { client: 'Client', rto: 'RTO', consultant: 'Consultant', fm: 'Facility Management' };
      return 'Verify By' + (v[u.verifyRole] ? ' · ' + v[u.verifyRole] : '');
    }
    return u.portalRole;
  }

  global.WEPL_AUTH = {
    ready: ready,
    defaultAdminId: DEFAULT_ADMIN_ID,
    defaultAdminPw: DEFAULT_ADMIN_PW,
    currentUser: currentUser,
    login: login,
    logout: logout,
    changePassword: changePassword,
    setPassword: setPassword,
    createUser: createUser,
    updateUser: updateUser,
    applyUserFields: applyUserFields,
    users: function () {
      var admin = currentUser() && currentUser().portalRole === 'admin';
      return store.users.map(function (u) {
        var copy = Object.assign({}, u);
        if (!admin) {
          delete copy.passwordHash;
          delete copy.passwordHint;
        }
        return copy;
      });
    },
    findUser: findUser,
    notify: notify,
    notifyMany: notifyMany,
    inbox: inbox,
    unreadCount: unreadCount,
    markRead: markRead,
    markProjectRead: markProjectRead,
    canNav: canNav,
    canProject: canProject,
    usersForProject: usersForProject,
    roleLabel: roleLabel,
    save: function () { return saveAuth(store); }
  };
})(window);
