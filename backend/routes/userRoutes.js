const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.post('/register', async (req, res) => {
    try {
        // Debug logging
        console.log('Registration attempt with body:', req.body);

        // Validate request body
        if (!req.body) {
            return res.status(400).json({
                success: false,
                message: 'Request body is missing'
            });
        }

        // Destructure with validation
        const { name, email, number, password, cpassword } = req.body;

        // Validate all required fields
        if (!name || !email || !number || !password || !cpassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                receivedFields: {
                    name: !!name,
                    email: !!email,
                    number: !!number,
                    password: !!password,
                    cpassword: !!cpassword
                }
            });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            number,
            password,
            cpassword
        });

        // Save user
        const savedUser = await newUser.save();
        
        // Return success response
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: savedUser._id
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
});

// GET → fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, '-password -cpassword');
        res.json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

module.exports = router;