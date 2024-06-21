const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bookController = require('../controllers/book.controller');
const { verifyToken } = require('../auth/auth');

router
.get('/', verifyToken, bookController.get)
.get('/:id', verifyToken, bookController.getById)
.post('/', [
    verifyToken,
    // Validaciones
    body('name').notEmpty().withMessage('Name is required'),
    body('edition').notEmpty().withMessage('Edition is required'),
    body('edition_date').isDate().withMessage('Edition date must be a valid date'),
    body('author_id').isInt().withMessage('Author ID must be an integer')
  ], bookController.create)
  .put('/:id', [
    verifyToken,
    // Validaciones
    body('name').notEmpty().withMessage('Name is required'),
    body('edition').notEmpty().withMessage('Edition is required'),
    body('edition_date').isDate().withMessage('Edition date must be a valid date'),
    body('author_id').isInt().withMessage('Author ID must be an integer')
  ], bookController.update)
.delete('/:id', verifyToken, bookController._delete);

module.exports = router;