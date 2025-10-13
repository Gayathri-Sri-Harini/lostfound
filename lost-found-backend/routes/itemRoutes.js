const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const ItemController = require('../controllers/ItemController'); // 🔴 check this line

const {
  reportItem,
  searchItems,
  getUserItems,
  markResolved // ✅ Now it's included
} = require('../controllers/itemController');

router.get('/user', getUserItems);
router.get('/search', searchItems);
router.post('/report', reportItem);
router.post('/resolve', verifyToken, markResolved);

module.exports = router;