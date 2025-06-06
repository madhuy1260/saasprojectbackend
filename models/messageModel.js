const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createChannel = (channel) => {
  const id = uuidv4();
  const query = `INSERT INTO channels (id, tenantId, name, createdBy) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, channel.tenantId, channel.name, channel.createdBy], function (err) {
      if (err) reject(err);
      else resolve({ id, ...channel });
    });
  });
};

exports.getChannels = (tenantId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM channels WHERE tenantId = ?`, [tenantId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.sendMessage = (msg) => {
  const id = uuidv4();
  const query = `INSERT INTO messages (id, channelId, senderId, content, timestamp) VALUES (?, ?, ?, ?, datetime('now'))`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, msg.channelId, msg.senderId, msg.content], function (err) {
      if (err) reject(err);
      else resolve({ id, ...msg });
    });
  });
};

exports.getReplies = (messageId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM threads WHERE parentId = ?`, [messageId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.replyToMessage = (messageId, reply) => {
  const id = uuidv4();
  const query = `INSERT INTO threads (id, parentId, senderId, content, timestamp) VALUES (?, ?, ?, ?, datetime('now'))`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, messageId, reply.senderId, reply.content], function (err) {
      if (err) reject(err);
      else resolve({ id, ...reply });
    });
  });
};

exports.reactToMessage = (messageId, emoji) => {
  const id = uuidv4();
  const query = `INSERT INTO reactions (id, messageId, emoji) VALUES (?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(query, [id, messageId, emoji], function (err) {
      if (err) reject(err);
      else resolve({ id, messageId, emoji });
    });
  });
};

exports.getUserPresence = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT status FROM presence WHERE userId = ?`, [userId], (err, row) => {
      if (err) reject(err);
      else resolve(row?.status || 'offline');
    });
  });
};

exports.pinMessage = (messageId) => {
  const query = `UPDATE messages SET pinned = 1 WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [messageId], function (err) {
      if (err) reject(err);
      else resolve({ messageId, pinned: true });
    });
  });
};

exports.deleteMessage = (messageId) => {
  const query = `DELETE FROM messages WHERE id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [messageId], function (err) {
      if (err) reject(err);
      else resolve({ messageId, deleted: true });
    });
  });
};
