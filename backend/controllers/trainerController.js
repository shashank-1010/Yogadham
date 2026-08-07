const asyncHandler = require('express-async-handler');
const Trainer = require('../models/Trainer');

// @desc    Get all active trainers (public)
// @route   GET /api/trainers
// @access  Public
const getTrainers = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: trainers.length, data: trainers });
});

// @desc    Get all trainers including inactive (admin)
// @route   GET /api/trainers/all
// @access  Private (admin)
const getAllTrainersAdmin = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find().sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: trainers.length, data: trainers });
});

// @desc    Create a trainer
// @route   POST /api/trainers
// @access  Private (admin)
const createTrainer = asyncHandler(async (req, res) => {
  const { name, designation, specialization, experience, bio, image, order, isActive } = req.body;

  if (!name || !designation || !specialization || !experience || !bio) {
    res.status(400);
    throw new Error('Name, designation, specialization, experience and bio are required');
  }

  const trainer = await Trainer.create({
    name,
    designation,
    specialization,
    experience,
    bio,
    image,
    order,
    isActive,
  });

  res.status(201).json({ success: true, data: trainer });
});

// @desc    Update a trainer
// @route   PUT /api/trainers/:id
// @access  Private (admin)
const updateTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (!trainer) {
    res.status(404);
    throw new Error('Trainer not found');
  }

  const fields = ['name', 'designation', 'specialization', 'experience', 'bio', 'image', 'order', 'isActive'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      trainer[field] = req.body[field];
    }
  });

  await trainer.save();
  res.json({ success: true, data: trainer });
});

// @desc    Delete a trainer
// @route   DELETE /api/trainers/:id
// @access  Private (admin)
const deleteTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (!trainer) {
    res.status(404);
    throw new Error('Trainer not found');
  }

  await trainer.deleteOne();
  res.json({ success: true, message: 'Trainer deleted successfully' });
});

module.exports = {
  getTrainers,
  getAllTrainersAdmin,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
