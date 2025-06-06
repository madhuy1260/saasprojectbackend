const express = require('express');
const router = express.Router();
const utilityController = require('../controllers/utilityController');
const multer = require('multer');
const path = require('path');

// Upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Utilities
router.get('/search/users', utilityController.searchUsers);
router.get('/files/:fileId', utilityController.downloadFile);
router.post('/files/upload', upload.single('file'), utilityController.uploadFile);

module.exports = router;
