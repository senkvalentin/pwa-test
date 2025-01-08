import express from 'express';
import { createUser, getUserByEmail } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { vorname, nachname, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Create the user
        const newUser = await createUser(vorname, nachname, email, hashedPassword);

        // Send a success response
        res.status(201).json({
            id: newUser.id,
            vorname: newUser.vorname,
            nachname: newUser.nachname,
            email: newUser.email,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    // Send success response with the token
    res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            vorname: user.vorname,
            nachname: user.nachname,
            email: user.email,
        },
    });
});

export default router;
