const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.post('/send', mailController.sendEmail);
router.get('/inbox/:userId', mailController.getInbox);
router.get('/sent/:userId', mailController.getSent);
router.get('/thread/:emailThreadId', mailController.getThread);
router.post('/reply/:emailId', mailController.replyToEmail);
router.delete('/delete/:emailId', mailController.deleteEmail);
router.post('/archive/:emailId', mailController.archiveEmail);
router.post('/unsubscribe/:sender', mailController.unsubscribeSender);

module.exports = router;
