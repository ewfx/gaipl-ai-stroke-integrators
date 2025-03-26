const fs = require('fs').promises;
const path = require('path');

class FeedbackService {
  constructor() {
    this.feedbackFile = path.join(__dirname, '../data/feedback.json');
    this.feedbackData = { incidents: [] };
    this.loadFeedback();
  }

  async loadFeedback() {
    try {
      const data = await fs.readFile(this.feedbackFile, 'utf8');
      this.feedbackData = JSON.parse(data);
    } catch (err) {
      // If file doesn't exist, initialize with empty data
      this.feedbackData = { incidents: [] };
      await this.saveFeedback();
    }
  }

  async saveFeedback() {
    await fs.writeFile(this.feedbackFile, JSON.stringify(this.feedbackData, null, 2));
  }

  async addFeedback(incident, action, success) {
    this.feedbackData.incidents.push({ incident, action, success, timestamp: new Date() });
    await this.saveFeedback();
  }

  getSuccessfulActions(incident) {
    return this.feedbackData.incidents
      .filter((entry) => entry.incident === incident && entry.success)
      .map((entry) => entry.action);
  }
}

module.exports = new FeedbackService();