const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = await Student.create({ name, email });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student.' });
    }
});

module.exports = router;
