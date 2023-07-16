const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import API routes
const mentorsRoutes = require('./routes/mentors');
const studentsRoutes = require('./routes/students');
const assignmentsRoutes = require('./routes/assignments');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection failed', error);
    });

// Configure middleware
app.use(express.json());

// Define API routes
app.use('/api/mentors', mentorsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/assignments', assignmentsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send("This is Student- Mentor api")
})