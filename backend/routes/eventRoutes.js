const express = require('express');
const Event = require('../models/eventSchema');

const router = express.Router();

// Route to create a new event
router.post('/', async (req, res) => {
    try {
        const {
            type, title, headline, about, description, poster,
            startDate, startTime, endDate, endTime, mode, venue,
            organizedBy, contactPerson, socialLink, registrationDeadline,
            registrationFee, maxParticipants, participantType, prizePool,
            tags, eligibility
        } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!type) missingFields.push('type');
        if (!title) missingFields.push('title');
        if (!headline) missingFields.push('headline');
        if (!about) missingFields.push('about');
        if (!description) missingFields.push('description');
        if (!poster) missingFields.push('poster');
        if (!startDate) missingFields.push('startDate');
        if (!startTime) missingFields.push('startTime');
        if (!endDate) missingFields.push('endDate');
        if (!endTime) missingFields.push('endTime');
        if (!mode) missingFields.push('mode');
        if (!organizedBy) missingFields.push('organizedBy');
        if (!contactPerson) missingFields.push('contactPerson');
        if (!registrationDeadline) missingFields.push('registrationDeadline');
        if (!maxParticipants) missingFields.push('maxParticipants');
        if (!participantType) missingFields.push('participantType');

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Validate contactPerson fields
        if (!contactPerson.name || !contactPerson.email || !contactPerson.number) {
            return res.status(400).json({
                success: false,
                message: 'Contact person details (name, email, number) are required.'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contactPerson.email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }

        // Validate phone number format (10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(contactPerson.number)) {
            return res.status(400).json({ success: false, message: 'Invalid phone number. It must be 10 digits.' });
        }

        // Validate startDate and endDate
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: 'End date must be later than start date.'
            });
        }

        // Validate maxParticipants
        if (maxParticipants <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Max participants must be a positive number.'
            });
        }

        // Create and save the new event
        const newEvent = new Event({
            type, title, headline, about, description, poster,
            startDate, startTime, endDate, endTime, mode, venue,
            organizedBy, contactPerson, socialLink, registrationDeadline,
            registrationFee, maxParticipants, participantType, prizePool,
            tags, eligibility
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: 'Event created successfully.',
            event: newEvent
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;