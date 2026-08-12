const asyncHandler = require('express-async-handler');
const Feedback = require('../models/Feedback');

// @desc    Create a new feedback (public feedback form submission)
// @route   POST /api/feedback
// @access  Public
const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, program, rating, message } = req.body;

  if (!name || !email || !rating || !message) {
    res.status(400);
    throw new Error('Name, email, rating and message are required');
  }

  const numericRating = Number(rating);
  if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    res.status(400);
    throw new Error('Rating must be a whole number between 1 and 5');
  }

  const feedback = await Feedback.create({
    name,
    email,
    program: program || '',
    rating: numericRating,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for your feedback! We appreciate you taking the time to share it.',
    data: feedback,
  });
});

// @desc    Get all feedback submissions
// @route   GET /api/feedback
// @access  Private (admin)
const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  res.json({ success: true, count: feedbacks.length, data: feedbacks });
});

// @desc    Update feedback status
// @route   PUT /api/feedback/:id
// @access  Private (admin)
const updateFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  feedback.status = req.body.status || feedback.status;
  await feedback.save();

  res.json({ success: true, data: feedback });
});

// @desc    Delete a feedback submission
// @route   DELETE /api/feedback/:id
// @access  Private (admin)
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  await feedback.deleteOne();

  res.json({ success: true, message: 'Feedback deleted successfully' });
});

module.exports = {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback,
};
