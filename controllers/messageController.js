const messageModel = require('../models/messageModel');

exports.createChannel = async (req, res) => {
  try {
    const channel = await messageModel.createChannel(req.body);
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ error: 'Error creating channel', details: err.message });
  }
};

exports.getChannels = async (req, res) => {
  try {
    const channels = await messageModel.getChannels(req.params.tenantId);
    res.json(channels);
  } catch (err) {
    res.status(500).json({ error: 'Error getting channels', details: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = await messageModel.sendMessage(req.body);
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Error sending message', details: err.message });
  }
};

exports.getThread = async (req, res) => {
  try {
    const replies = await messageModel.getReplies(req.params.messageId);
    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: 'Error getting thread', details: err.message });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const reply = await messageModel.replyToMessage(req.params.messageId, req.body);
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: 'Error replying to message', details: err.message });
  }
};

exports.reactToMessage = async (req, res) => {
  try {
    const result = await messageModel.reactToMessage(req.params.messageId, req.body.emoji);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error reacting to message', details: err.message });
  }
};

exports.getUserPresence = async (req, res) => {
  try {
    const status = await messageModel.getUserPresence(req.params.userId);
    res.json({ presence: status });
  } catch (err) {
    res.status(500).json({ error: 'Error getting presence', details: err.message });
  }
};

exports.pinMessage = async (req, res) => {
  try {
    const result = await messageModel.pinMessage(req.params.messageId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error pinning message', details: err.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const result = await messageModel.deleteMessage(req.params.messageId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error deleting message', details: err.message });
  }
};
