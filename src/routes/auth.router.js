const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { User } = require('../db/models/users.model');
const { generateToken } = require('../auth/auth');
const router = express.Router();

// Register route
router.post('/register', [
    // Validations
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ success: false, message: 'User already exists.' });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Generate token
    const token = generateToken(newUser);
   // Respond with success message and token
   res.status(201).send({ success: true, message: 'Usuario creado', token });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });
}
});

// Login route
router.post('/login', [
    // Validations
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ], async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ success: false, message: 'User not found.' });
    }

    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ success: false, message: 'Invalid password.' });
    }

    // Generate token
    const token = generateToken(user);
    res.status(200).send({ success: true, token });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;