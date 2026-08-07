const express = require('express');
const {
  getTrainers,
  getAllTrainersAdmin,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} = require('../controllers/trainerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getTrainers);
router.get('/all', protect, getAllTrainersAdmin);
router.post('/', protect, createTrainer);
router.put('/:id', protect, updateTrainer);
router.delete('/:id', protect, deleteTrainer);

module.exports = router;
