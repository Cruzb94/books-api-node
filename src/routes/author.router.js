const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authorController = require('../controllers/author.controller');
const { verifyToken } = require('../auth/auth');

router
.get('/', verifyToken, authorController.get)

.get('/:id', verifyToken, authorController.getById)

.post('/', [
    verifyToken,
    // Validaciones
    body('name').notEmpty().withMessage('Name is required'),
    body('date_birth').isDate().withMessage('Date of birth must be a valid date'),
    body('literary_genre').notEmpty().withMessage('Literary genre is required')
  ], authorController.create)
  .put('/:id', [
    verifyToken,
    // Validaciones
    body('name').notEmpty().withMessage('Name is required'),
    body('date_birth').isDate().withMessage('Date of birth must be a valid date'),
    body('literary_genre').notEmpty().withMessage('Literary genre is required')
  ], authorController.update)

  .get('/export/excel', verifyToken, authorController.exportToExcel)


.delete('/:id', verifyToken, authorController._delete);

module.exports = router;