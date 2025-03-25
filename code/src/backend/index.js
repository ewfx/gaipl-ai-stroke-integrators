const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure correct imports
const chatbotRoutes = require('./routes/chatbot');  // Ensure correct path
const incidentRoutes = require('./routes/incidents');
const automationRoutes = require('./routes/automation');

// Ensure that these are used as middleware
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/automation', automationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
