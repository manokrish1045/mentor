const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Assign a student to a mentor
router.post('/assign', async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;
        const mentor = await Mentor.findById(mentorId);
        const students = await Student.find({ _id: { $in: studentIds }, mentor: { $exists: false } });

        if (!mentor || students.length !== studentIds.length) {
            return res.status(404).json({ error: 'Mentor or student not found or some students are already assigned.' });
        }

        mentor.students.push(...students);
        students.forEach((student) => {
            student.mentor = mentor._id;
            student.save();
        });
        mentor.save();

        res.json({ success: true, message: 'Students assigned to mentor successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to assign students to mentor.' });
    }
});

module.exports = router;
