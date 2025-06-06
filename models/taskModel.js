const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// 1. Create new board
exports.createBoard = (board) => {
  const id = uuidv4();
  const query = `INSERT INTO boards (id, tenantId, name, type) VALUES (?, ?, ?, ?)`;
  return db.run(query, [id, board.tenantId, board.name, board.type]);
};

// 2. Get boards of tenant
exports.getBoards = (tenantId) => {
  return db.all(`SELECT * FROM boards WHERE tenantId = ?`, [tenantId]);
};

// 3. Create new ticket
exports.createTicket = (ticket) => {
  const id = uuidv4();
  const query = `INSERT INTO tickets (id, boardId, title, description, status, assigneeId) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
  return db.run(query, [id, ticket.boardId, ticket.title, ticket.description, 'todo', ticket.assigneeId]);
};

// 4. Get tickets for board
exports.getTickets = (boardId) => {
  return db.all(`SELECT * FROM tickets WHERE boardId = ?`, [boardId]);
};

// 5. Update ticket
exports.updateTicket = (ticketId, updates) => {
  const { status, assigneeId, title, description } = updates;
  const query = `UPDATE tickets SET status = ?, assigneeId = ?, title = ?, description = ? WHERE id = ?`;
  return db.run(query, [status, assigneeId, title, description, ticketId]);
};

// 6. Get ticket details
exports.getTicket = (ticketId) => {
  return db.get(`SELECT * FROM tickets WHERE id = ?`, [ticketId]);
};

// 7. Add comment to ticket
exports.addComment = (ticketId, comment) => {
  const id = uuidv4();
  const query = `INSERT INTO comments (id, ticketId, userId, text, timestamp) 
                 VALUES (?, ?, ?, ?, ?)`;
  return db.run(query, [id, ticketId, comment.userId, comment.text, new Date().toISOString()]);
};

// 8. Get comments
exports.getComments = (ticketId) => {
  return db.all(`SELECT * FROM comments WHERE ticketId = ? ORDER BY timestamp ASC`, [ticketId]);
};

// 9. Get board report
exports.getBoardReport = (boardId) => {
  const query = `
    SELECT 
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'todo' THEN 1 ELSE 0 END) AS todo,
      SUM(CASE WHEN status = 'in-progress' THEN 1 ELSE 0 END) AS inProgress,
      SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done
    FROM tickets WHERE boardId = ?
  `;
  return db.get(query, [boardId]);
};

// 10. View/Create sprint (mock implementation)
exports.getSprint = (boardId) => {
  return db.all(`SELECT * FROM sprints WHERE boardId = ?`, [boardId]);
};
