const { getGeminiResponse } = require('../services/geminiService');

const chat = async (req, res) => {
  const { prompt, conversationId } = req.body;
  try {
    const response = await getGeminiResponse(prompt, conversationId || 'default');
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { chat };