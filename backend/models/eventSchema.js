const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // links to the Event model
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Registration', registrationSchema);
