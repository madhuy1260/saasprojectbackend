const taskModel = require('../models/taskModel');

exports.createBoard = async (req, res) => {
  try {
    await taskModel.createBoard(req.body);
    res.status(201).json({ message: 'Board created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create board', details: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await taskModel.getBoards(req.params.tenantId);
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

exports.createTicket = async (req, res) => {
  try {
    await taskModel.createTicket(req.body);
    res.status(201).json({ message: 'Ticket created' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await taskModel.getTickets(req.params.boardId);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    await taskModel.updateTicket(req.params.ticketId, req.body);
    res.json({ message: 'Ticket updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

exports.getTicket = async (req, res) => {
  try {
    const ticket = await taskModel.getTicket(req.params.ticketId);
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

exports.addComment = async (req, res) => {
  try {
    await taskModel.addComment(req.params.ticketId, req.body);
    res.status(201).json({ message: 'Comment added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await taskModel.getComments(req.params.ticketId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await taskModel.getBoardReport(req.params.boardId);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

exports.getSprint = async (req, res) => {
  try {
    const sprints = await taskModel.getSprint(req.params.boardId);
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sprint' });
  }
};
