const express = require('express');
const router = express.Router();

// Temporary in-memory user list (no DB yet)
const users = [];

// POST /api/users
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).json(newUser);
});

// GET /api/users
router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
