const express = require('express');
const Profile = require('../models/profileSchema');

const router = express.Router();

// Route to create or update a profile
router.post('/profile', async (req, res) => {
    try {
        const { name, number, email, collegeName, skills, socialLinks } = req.body;

        // Validate required fields
        if (!name || !number || !email || !collegeName) {
            return res.status(400).json({ success: false, message: 'Name, number, email, and college name are required.' });
        }

        // Find and update the profile, or create a new one if it doesn't exist
        const profile = await Profile.findOneAndUpdate(
            { email }, // Match by email
            { name, number, collegeName, skills, socialLinks },
            { new: true, upsert: true } // Create if not found, return the updated document
        );

        res.status(200).json({ success: true, message: 'Profile saved successfully.', profile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Route to get a profile by email
router.get('/profile/:email', async (req, res) => {
    try {
        const { email } = req.params;

        // Find the profile by email
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found.' });
        }

        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;