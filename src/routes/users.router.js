const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usersController = require('../controllers/users.controller');

router
.get('/', async (req, res) => {
    try {
        const response = await usersController.get(req, res); // Llama al método get del controlador
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
})
.get('/:id', usersController.getById)

.put('/:id',  [
    // Validaciones
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], usersController.update) 

  
.delete('/:id', usersController._delete);

module.exports = router;