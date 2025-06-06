const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const mailRoutes = require('./routes/mailRoutes');
const taskRoutes = require('./routes/taskRoutes');





const db = require('./config/db'); // ✅ centralized DB

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/mail', mailRoutes);
app.use('/api/tasks', taskRoutes);

app.use('/api/plans', require('./routes/planRoutes'));
app.use('/api/utils', require('./routes/utilityRoutes'));

// Sample API to test DB
app.get('/tenants', async (req, res) => {
  try {
    const tenants = await db.all('SELECT * FROM Tenants');
    res.json({ tenants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
