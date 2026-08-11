const asyncHandler = require('express-async-handler');
const Enquiry = require('../models/Enquiry');

// @desc    Create a new enquiry (public contact/enquiry form submission)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const enquiry = await Enquiry.create({ name, email, phone, message });

  res.status(201).json({
    success: true,
    message: "Thanks for reaching out — we'll respond within a day.",
    data: enquiry,
  });
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (admin)
const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (admin)
const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  enquiry.status = req.body.status || enquiry.status;
  await enquiry.save();

  res.json({ success: true, data: enquiry });
});

// @desc    Delete an enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (admin)
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  await enquiry.deleteOne();

  res.json({ success: true, message: 'Enquiry deleted successfully' });
});

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
};
