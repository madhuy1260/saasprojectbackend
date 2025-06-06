const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register-tenant', authController.registerTenant);
router.post('/register-user', authController.registerUser);
router.post('/login', authController.login);
router.get('/validate-token', authController.validateToken);


router.get('/users/:tenantId', authController.getUsersByTenant);
router.get('/profile/:userId', authController.getProfileByUserId);

router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
