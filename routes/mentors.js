const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

// Create a new mentor
router.post('/', async (req, res) => {
    try {
        const { name, email } = req.body;
        const mentor = await Mentor.create({ name, email });
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create mentor.' });
    }
});

module.exports = router;
