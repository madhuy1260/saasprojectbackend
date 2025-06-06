const meetingModel = require('../models/meetingModel');

exports.createMeeting = async (req, res) => {
  try {
    await meetingModel.createMeeting(req.body);
    res.status(201).json({ message: 'Meeting created' });
  } catch (err) {
    res.status(500).json({ error: 'Meeting creation failed', details: err.message });
  }
};

exports.getMeetingsByTenant = async (req, res) => {
  try {
    const meetings = await meetingModel.getMeetingsByTenant(req.params.tenantId);
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await meetingModel.getMeetingById(req.params.meetingId);
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get meeting details' });
  }
};

exports.joinMeeting = async (req, res) => {
  try {
    await meetingModel.joinMeeting(req.params.meetingId, req.body.userId);
    res.json({ message: 'Joined meeting' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to join meeting' });
  }
};

exports.toggleRecording = async (req, res) => {
  try {
    await meetingModel.toggleRecording(req.params.meetingId, req.body.status);
    res.json({ message: `Recording ${req.body.status}` });
  } catch (err) {
    res.status(500).json({ error: 'Recording toggle failed' });
  }
};

exports.sendChatInMeeting = async (req, res) => {
  try {
    await meetingModel.sendChatInMeeting(req.body);
    res.json({ message: 'Message sent in meeting' });
  } catch (err) {
    res.status(500).json({ error: 'Chat failed' });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const summary = await meetingModel.getSummary(req.params.meetingId);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Summary generation failed' });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendees = await meetingModel.getAttendance(req.params.meetingId);
    res.json(attendees);
  } catch (err) {
    res.status(500).json({ error: 'Attendance fetch failed' });
  }
};
