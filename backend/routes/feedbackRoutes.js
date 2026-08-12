const express = require('express');
const {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createFeedback);
router.get('/', protect, getFeedbacks);
router.put('/:id', protect, updateFeedback);
router.delete('/:id', protect, deleteFeedback);

module.exports = router;
