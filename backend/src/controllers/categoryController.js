const Category = require('../models/Category');

//GET
exports.getCategories = async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: `Error fetching categories: ${error.message}` });
    }
};

//POST
exports.createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: `Error creating category: ${error.message}` });
    }
};

//PUT
exports.updateCategory = async (req, res) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: `Error updating category: ${error.message}` });
    }
};

//DELETE
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting category: ${error.message}` });
    }
};