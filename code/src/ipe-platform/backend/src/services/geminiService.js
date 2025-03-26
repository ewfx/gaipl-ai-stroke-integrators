const axios = require('axios');
const { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } = require('@langchain/core/prompts');
const dotenv = require('dotenv');
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Custom in-memory store for conversation history
const conversationHistories = new Map();

const getGeminiResponse = async (prompt, conversationId) => {
  try {
    // Retrieve conversation history
    let history = conversationHistories.get(conversationId) || [];

    // Add the current prompt to history
    history.push({ role: 'user', content: prompt });

    // Create a prompt with conversation history
    const systemPrompt = SystemMessagePromptTemplate.fromTemplate(
      'You are an AI assistant helping with platform incident resolution. Use the conversation history to provide context-aware responses.'
    );
    const humanPrompt = HumanMessagePromptTemplate.fromTemplate(
      'Conversation history: {chat_history}\n\nUser: {prompt}'
    );
    const chatPrompt = ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]);
    const formattedPrompt = await chatPrompt.format({
      chat_history: history.map(msg => `${msg.role}: ${msg.content}`).join('\n'),
      prompt
    });

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: formattedPrompt }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.candidates[0].content.parts[0].text;

    // Add the AI response to history
    history.push({ role: 'assistant', content: aiResponse });
    conversationHistories.set(conversationId, history);

    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get response from Gemini API');
  }
};

module.exports = { getGeminiResponse };