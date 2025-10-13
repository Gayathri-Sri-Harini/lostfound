const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages
router.get('/all', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('senderId', 'username')
      .populate('receiverId', 'username')
      .populate('itemId', 'name'); // adjust field if needed
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new message
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, itemId, content } = req.body;
    const newMessage = new Message({ senderId, receiverId, itemId, content });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: 'Send failed' });
  }
});

module.exports = router;