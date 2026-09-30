/* Hosted sign-in list for the launched site. Local portal_server.py still handles /api/auth on this PC. */
const fs = require('fs');
const path = require('path');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadStore() {
  const files = [
    path.join(__dirname, 'directory.json'),
    path.join(process.cwd(), 'data', 'auth.json')
  ];
  for (let i = 0; i < files.length; i++) {
    if (!fs.existsSync(files[i])) continue;
    const data = readJson(files[i]);
    const users = (data.users || []).map(function (u) {
      const copy = Object.assign({}, u);
      delete copy.passwordHint;
      return copy;
    });
    return {
      users: users,
      notifications: Array.isArray(data.notifications) ? data.notifications : []
    };
  }
  return null;
}

module.exports = function (req, res) {
  if (req.method === 'GET') {
    const store = loadStore();
    res.setHeader('Cache-Control', 'no-store');
    if (!store) {
      res.status(404).json({ users: [], notifications: [] });
      return;
    }
    res.status(200).json(store);
    return;
  }
  if (req.method === 'POST') {
    res.status(200).json({ ok: true });
    return;
  }
  res.status(405).json({ ok: false, error: 'Unsupported method' });
};
