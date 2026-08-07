const asyncHandler = require('express-async-handler');
const Registration = require('../models/Registration');

// @desc    Create a new registration (public form submission)
// @route   POST /api/registrations
// @access  Public
const createRegistration = asyncHandler(async (req, res) => {
  const { name, email, phone, age, gender, preferredBatch } = req.body;

  if (!name || !email || !phone || !age || !gender || !preferredBatch) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const registration = await Registration.create({
    name,
    email,
    phone,
    age,
    gender,
    preferredBatch,
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful! Our team will reach out to you shortly.',
    data: registration,
  });
});

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private (admin)
const getRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find().sort({ createdAt: -1 });
  res.json({ success: true, count: registrations.length, data: registrations });
});

// @desc    Update registration status
// @route   PUT /api/registrations/:id
// @access  Private (admin)
const updateRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  registration.status = req.body.status || registration.status;
  await registration.save();

  res.json({ success: true, data: registration });
});

// @desc    Delete a registration
// @route   DELETE /api/registrations/:id
// @access  Private (admin)
const deleteRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    res.status(404);
    throw new Error('Registration not found');
  }

  await registration.deleteOne();

  res.json({ success: true, message: 'Registration deleted successfully' });
});

module.exports = {
  createRegistration,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
};
