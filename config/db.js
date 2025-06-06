const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'saas_platform_full.db');
// 'C:\\Users\\ymadh\\OneDrive\\Desktop\\Projects\\taskmanager-backend\\db\\saas_platform_full.db';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ SQLite DB connection failed:', err.message);
  } else {
    console.log('✅ SQLite DB connected');
  }
});

const dbWrapper = {
  run: (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    }),
  get: (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    }),
  all: (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),
};

module.exports = dbWrapper;
