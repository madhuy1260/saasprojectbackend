const db = require('../config/db');

exports.searchUsers = (query) =>
  db.all(`SELECT id, name, email FROM users WHERE name LIKE ? OR email LIKE ?`, [`%${query}%`, `%${query}%`]);
