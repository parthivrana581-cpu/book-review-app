const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../data/books');
const { SECRET_KEY } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    const existingUser = users.find(u => u.username === username);
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, username, passwordHash };
    users.push(user);

    res.json({ message: "User registered successfully" });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;