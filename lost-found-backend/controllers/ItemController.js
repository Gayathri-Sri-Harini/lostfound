const Item = require('../models/Item');

exports.reportItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({ message: 'Item reported', item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to report item' });
  }
};
exports.searchItems = async (req, res) => {
  try {
    const { keyword, location, type } = req.query;
    const query = {};

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (location) query.location = location;
    if (type) query.type = type;

    const items = await Item.find(query).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
};
exports.getUserItems = async (req, res) => {
  try {
    const userId = req.query.userId;
    const items = await Item.find({ userId }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user items' });
  }
};
exports.markResolved = async (req, res) => {
  try {
    const { itemId } = req.body;
    await Item.findByIdAndUpdate(itemId, { resolved: true });
    res.json({ message: 'Item marked as resolved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};