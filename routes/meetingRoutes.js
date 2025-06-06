const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/create', meetingController.createMeeting);
router.get('/list/:tenantId', meetingController.getMeetingsByTenant);
router.get('/:meetingId', meetingController.getMeetingById);
router.post('/join/:meetingId', meetingController.joinMeeting);
router.post('/record/:meetingId', meetingController.toggleRecording);
router.post('/chat/:meetingId', meetingController.sendChatInMeeting);
router.get('/summary/:meetingId', meetingController.getSummary);
router.post('/attendance/:meetingId', meetingController.getAttendance);

module.exports = router;
