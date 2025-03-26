const { getGeminiResponse } = require('../services/geminiService');

const chat = async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getGeminiResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { chat };