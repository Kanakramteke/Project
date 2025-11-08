// ...existing code...
router.post('/', async (req, res) => {
  console.log('POST /api/users body:', req.body);

  const body = req.body || {};
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  try {
    // ...existing user creation code...
    res.status(201).json({ message: 'User created' }); // example success
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// ...existing code...