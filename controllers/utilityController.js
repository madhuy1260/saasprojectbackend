const utilityModel = require('../models/utilityModel');
const path = require('path');
const fs = require('fs');

exports.searchUsers = async (req, res) => {
  const query = req.query.query || '';
  const users = await utilityModel.searchUsers(query);
  res.json({ results: users });
};

exports.downloadFile = (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(__dirname, '..', 'uploads', fileId);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
};

exports.uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ message: 'File uploaded', fileId: req.file.filename });
};
