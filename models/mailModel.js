const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Send Email
exports.sendEmail = (email) => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();
  const query = `
    INSERT INTO emails (id, senderId, receiverId, subject, body, timestamp, status, threadId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  return db.run(query, [
    id, email.senderId, email.receiverId, email.subject, email.body,
    timestamp, 'sent', email.threadId || id
  ]);
};

// Inbox
exports.getInbox = (userId) => {
  const query = `SELECT * FROM emails WHERE receiverId = ? AND status != 'deleted' ORDER BY timestamp DESC`;
  return db.all(query, [userId]);
};

// Sent
exports.getSent = (userId) => {
  const query = `SELECT * FROM emails WHERE senderId = ? AND status != 'deleted' ORDER BY timestamp DESC`;
  return db.all(query, [userId]);
};

// Thread
exports.getThread = (threadId) => {
  const query = `SELECT * FROM emails WHERE threadId = ? ORDER BY timestamp ASC`;
  return db.all(query, [threadId]);
};

// Reply
exports.replyToEmail = (email) => {
  return exports.sendEmail(email); // same send method
};

// Delete
exports.deleteEmail = (emailId) => {
  const query = `UPDATE emails SET status = 'deleted' WHERE id = ?`;
  return db.run(query, [emailId]);
};

// Archive
exports.archiveEmail = (emailId) => {
  const query = `UPDATE emails SET status = 'archived' WHERE id = ?`;
  return db.run(query, [emailId]);
};

// Unsubscribe
exports.unsubscribeFromSender = (sender) => {
  const query = `UPDATE emails SET status = 'archived' WHERE senderId = ?`;
  return db.run(query, [sender]);
};
