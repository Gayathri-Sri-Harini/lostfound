const Message = require('../models/Message');

exports.getMessagesBetweenUsers = async (req, res) => {
  const { userA, userB } = req.query;
  if (!userA || !userB) return res.status(400).json({ error: 'Missing user IDs' });

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA }
      ]
    })
      .populate('senderId', 'username')
      .populate('receiverId', 'username')
      .sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
exports.getReceivedMessages = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const messages = await Message.find({ receiverId: userId })
      .populate('senderId', 'username')
      .populate('itemId', 'title')
      .sort({ timestamp: -1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch received messages' });
  }
};