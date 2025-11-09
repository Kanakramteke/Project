const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  teamMembers: {
    type: [String], // Array of team member names
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking'], // Restrict to specific payment modes
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);