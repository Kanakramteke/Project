const express = require('express');
const Registration = require('../models/registrationSchema'); // Correct model import

const router = express.Router();

// Route to create a new registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, contact, collegeName, teamMembers, paymentMode } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !collegeName || !paymentMode) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
    }

    // Create a new registration
    const registration = new Registration({
      name,
      email,
      contact,
      collegeName,
      teamMembers: teamMembers || [], // Default to an empty array if not provided
      paymentMode,
    });

    const savedRegistration = await registration.save();
    res.status(201).json({ success: true, message: 'Registration successful.', registration: savedRegistration });
  } catch (error) {
    console.error('Error creating registration:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Route to fetch all registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json({ success: true, registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;