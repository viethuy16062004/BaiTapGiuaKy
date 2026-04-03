const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/baitap';

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Kết nối MongoDB thất bại:', err));

// Message Schema
const MessageSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Student info API
app.get('/api/student', (req, res) => {
  res.json({
    name: 'Nguyễn Văn A',
    student_id: '20211234',
    class: 'IT-01',
    appName: process.env.APP_NAME || 'BaiTapGiuaKy'
  });
});

// Messages API
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = new Message({ content: req.body.content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server đang chạy tại http://0.0.0.0:${PORT}`);
});
