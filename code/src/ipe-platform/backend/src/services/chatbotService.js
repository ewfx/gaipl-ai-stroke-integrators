const { GoogleGenerativeAI } = require('@google/gemini-api');

class ChatbotService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // Use an in-memory Map to store conversation history
    this.conversations = new Map();
  }

  async sendMessage(message, conversationId) {
    try {
      // Retrieve the conversation history from the Map
      let history = this.conversations.get(conversationId) || [];
      
      // Add the user's message to the history
      history.push({ role: 'user', content: message });

      // Prepare the prompt for the Gemini API
      const prompt = history.map((msg) => `${msg.role}: ${msg.content}`).join('\n') + '\nAI:';

      // Call the Gemini API to get a response
      const result = await this.model.generateContent(prompt);
      const aiResponse = result.response.text();

      // Add the AI's response to the history
      history.push({ role: 'assistant', content: aiResponse });

      // Save the updated history back to the Map
      this.conversations.set(conversationId, history);

      return { response: aiResponse };
    } catch (err) {
      throw new Error(`Failed to get response from Gemini API: ${err.message}`);
    }
  }

  async getConversationHistory(conversationId) {
    try {
      // Retrieve the conversation history from the Map
      const history = this.conversations.get(conversationId) || [];
      return history;
    } catch (err) {
      throw new Error(`Failed to retrieve conversation history: ${err.message}`);
    }
  }
}

module.exports = new ChatbotService();