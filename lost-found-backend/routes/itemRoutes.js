const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const {
  reportItem,
  searchItems,
  getUserItems,
  markResolved
} = require('../controllers/ItemController');

router.get('/user', getUserItems);
router.get('/search', searchItems);
router.post('/report', reportItem);
router.post('/resolve', verifyToken, markResolved);

module.exports = router;