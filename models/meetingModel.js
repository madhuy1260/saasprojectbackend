const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.createMeeting = (meeting) => {
  const id = uuidv4();
  const query = `
    INSERT INTO meetings (id, tenantId, title, hostId, dateTime, status)
    VALUES (?, ?, ?, ?, ?, ?)`;
  return db.run(query, [id, meeting.tenantId, meeting.title, meeting.hostId, meeting.dateTime, 'scheduled']);
};

exports.getMeetingsByTenant = (tenantId) => {
  const query = `SELECT * FROM meetings WHERE tenantId = ?`;
  return db.all(query, [tenantId]);
};

exports.getMeetingById = (meetingId) => {
  const query = `SELECT * FROM meetings WHERE id = ?`;
  return db.get(query, [meetingId]);
};

exports.joinMeeting = (meetingId, userId) => {
  const query = `INSERT INTO meeting_participants (meetingId, userId) VALUES (?, ?)`;
  return db.run(query, [meetingId, userId]);
};

exports.toggleRecording = (meetingId, status) => {
  const query = `UPDATE meetings SET recording = ? WHERE id = ?`;
  return db.run(query, [status, meetingId]);
};

exports.sendChatInMeeting = (chat) => {
  const query = `
    INSERT INTO meeting_chats (id, meetingId, senderId, message, timestamp)
    VALUES (?, ?, ?, ?, ?)`;
  return db.run(query, [uuidv4(), chat.meetingId, chat.senderId, chat.message, new Date()]);
};

exports.getSummary = (meetingId) => {
  // mock response (replace with AI later)
  return Promise.resolve({ summary: `Summary for meeting ${meetingId} (AI)` });
};

exports.getAttendance = (meetingId) => {
  const query = `
    SELECT users.id, users.name, users.email
    FROM meeting_participants
    JOIN users ON meeting_participants.userId = users.id
    WHERE meeting_participants.meetingId = ?`;
  return db.all(query, [meetingId]);
};
