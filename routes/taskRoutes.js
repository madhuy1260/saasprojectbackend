const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/board', taskController.createBoard);
router.get('/board/:tenantId', taskController.getBoards);

router.post('/ticket', taskController.createTicket);
router.get('/ticket/:boardId', taskController.getTickets);
router.put('/ticket/:ticketId', taskController.updateTicket);
router.get('/ticket-details/:ticketId', taskController.getTicket);

router.post('/comment/:ticketId', taskController.addComment);
router.get('/comments/:ticketId', taskController.getComments);

router.get('/report/:boardId', taskController.getReport);
router.get('/sprint/:boardId', taskController.getSprint);

module.exports = router;
