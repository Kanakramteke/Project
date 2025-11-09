const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, number, password, cpassword } = req.body;

        // Validate all required fields
        if (!name || !email || !number || !password || !cpassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Password match validation
        if (password !== cpassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create new user (do not store cpassword)
        const newUser = new User({
            name,
            email,
            number,
            password
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            userId: newUser._id
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
        const users = await User.find({}, '-password -tokens');
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

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = await user.generateAuthToken();
        res.cookie('jwtoken', token, { 
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true });

        res.json({
            success: true,
            message: 'Login successful',
            userId: user._id,
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
});

module.exports = router;