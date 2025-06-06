const mailModel = require('../models/mailModel');

exports.sendEmail = async (req, res) => {
  try {
    await mailModel.sendEmail(req.body);
    res.status(201).json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const inbox = await mailModel.getInbox(req.params.userId);
    res.json(inbox);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inbox' });
  }
};

exports.getSent = async (req, res) => {
  try {
    const sent = await mailModel.getSent(req.params.userId);
    res.json(sent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sent emails' });
  }
};

exports.getThread = async (req, res) => {
  try {
    const thread = await mailModel.getThread(req.params.emailThreadId);
    res.json(thread);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
};

exports.replyToEmail = async (req, res) => {
  try {
    await mailModel.replyToEmail(req.body);
    res.status(201).json({ message: 'Reply sent' });
  } catch (err) {
    res.status(500).json({ error: 'Reply failed' });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    await mailModel.deleteEmail(req.params.emailId);
    res.json({ message: 'Email deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete email' });
  }
};

exports.archiveEmail = async (req, res) => {
  try {
    await mailModel.archiveEmail(req.params.emailId);
    res.json({ message: 'Email archived' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to archive email' });
  }
};

exports.unsubscribeSender = async (req, res) => {
  try {
    await mailModel.unsubscribeFromSender(req.params.sender);
    res.json({ message: `Unsubscribed from ${req.params.sender}` });
  } catch (err) {
    res.status(500).json({ error: 'Unsubscribe failed' });
  }
};
