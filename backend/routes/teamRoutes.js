const express = require('express');
const Team = require('../models/teamSchema');

const router = express.Router();

// Create a new team
router.post('/', async (req, res) => {
    try {
        const { teamName, description } = req.body;

        if (!teamName || !description) {
            return res.status(400).json({
                success: false,
                message: 'Team name and description are required.'
            });
        }

        const existingTeam = await Team.findOne({ teamName });
        if (existingTeam) {
            return res.status(409).json({
                success: false,
                message: 'A team with this name already exists.'
            });
        }

        const newTeam = new Team({ teamName, description, members: [] });
        await newTeam.save();

        res.status(201).json({
            success: true,
            message: 'Team created successfully.',
            team: newTeam
        });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

// Add a member to a team
router.post('/:id/members', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, number, skills, collegeName } = req.body;

        if (!name || !number || !skills || !collegeName) {
            return res.status(400).json({
                success: false,
                message: 'All member details are required.'
            });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(number)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number. It must be a 10-digit number.'
            });
        }

        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: 'Team not found.'
            });
        }

        team.members.push({ name, number, skills, collegeName });
        await team.save();

        res.status(200).json({
            success: true,
            message: 'Member added successfully.',
            team
        });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
});

module.exports = router;
