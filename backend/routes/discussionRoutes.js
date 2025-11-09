const express = require('express');
const Discussion = require('../models/discussionSchema');

const router = express.Router();

// Route to add a reply to a discussion
router.post('/discussions/:id/replies', async (req, res) => {
  try {
    const { id } = req.params; // Extract the discussion ID from the URL
    const { name, reply } = req.body; // Extract the reply details from the request body

    // Validate required fields
    if (!name || !reply) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the discussion by ID
    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    // Add the reply to the discussion
    discussion.replies.push({ name, reply });
    const updatedDiscussion = await discussion.save();

    res.status(201).json(updatedDiscussion);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;