const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    program: {
      type: String,
      trim: true,
      default: '',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: [true, 'Feedback message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Reviewed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
