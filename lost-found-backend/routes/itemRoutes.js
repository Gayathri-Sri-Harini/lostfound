const express = require('express');
const router = express.Router();
 // 🔴 check this line

const {
  reportItem,
  searchItems,
  getUserItems,
  markResolved // ✅ Now it's included
} = require('../controllers/ItemController');

router.get('/user', getUserItems);
router.get('/search', searchItems);
router.post('/report', reportItem);
router.post('/resolve', verifyToken, markResolved);

module.exports = router;