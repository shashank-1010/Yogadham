const express = require('express');
const {
  createRegistration,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
} = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createRegistration);
router.get('/', protect, getRegistrations);
router.put('/:id', protect, updateRegistration);
router.delete('/:id', protect, deleteRegistration);

module.exports = router;
