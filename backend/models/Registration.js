const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 4,
      max: 100,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    preferredBatch: {
      type: String,
      required: [true, 'Preferred batch is required'],
      enum: [
        'Early Morning (5:30 AM - 7:00 AM)',
        'Morning (7:30 AM - 9:00 AM)',
        'Evening (5:30 PM - 7:00 PM)',
        'Night (7:30 PM - 9:00 PM)',
      ],
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Enrolled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', registrationSchema);
