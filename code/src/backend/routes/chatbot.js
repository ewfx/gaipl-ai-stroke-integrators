const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiKey = process.env.GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

async function callAIWithRetry(message, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(
                API_URL,
                { contents: [{ parts: [{ text: message }] }] },
                { params: { key: apiKey } }
            );
            return response.data.candidates[0].content;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error.response?.data || error.message);
            if (i === retries - 1 || error.response?.status !== 503) throw error;
            await new Promise(res => setTimeout(res, 2000)); // Wait before retrying
        }
    }
}

router.post('/', async (req, res) => {
    try {
        if (!apiKey) return res.status(500).json({ error: 'Missing API key' });
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        const reply = await callAIWithRetry(message);
        res.json({ reply });
    } catch (error) {
        res.status(503).json({ error: 'AI Service Unavailable, try again later' });
    }
});

module.exports = router;
