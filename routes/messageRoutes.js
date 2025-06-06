const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Channels
router.post('/channel', messageController.createChannel);
router.get('/channel/:tenantId', messageController.getChannels);

// Send & View Messages
router.post('/send', messageController.sendMessage);
router.get('/thread/:messageId', messageController.getThread);
router.post('/thread/:messageId/reply', messageController.replyToMessage);

// Reactions
router.post('/react/:messageId', messageController.reactToMessage);

// Presence
router.get('/presence/:userId', messageController.getUserPresence);

// Pin/Unpin
router.post('/pin/:messageId', messageController.pinMessage);

// Delete Message
router.post('/delete/:messageId', messageController.deleteMessage);

module.exports = router;
