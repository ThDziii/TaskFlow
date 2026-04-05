const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

// GET /api/categories 
router.get('/', getCategories);

// POST /api/categories 
router.post('/', createCategory);

// PUT /api/categories/:id
router.put('/:id', updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

module.exports = router;