const dataService = require('../services/dataService');

class DataController {
  async getTelemetryData(req, res) {
    try {
      const data = await dataService.getTelemetryData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEnterpriseData(req, res) {
    try {
      const data = await dataService.getEnterpriseData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DataController();