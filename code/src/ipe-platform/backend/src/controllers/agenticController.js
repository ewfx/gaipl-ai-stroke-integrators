const agenticService = require('../services/agenticService');

const launchHealthCheck = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const result = await agenticService.launchHealthCheck(serviceId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateRCA = async (req, res) => {
  const { incidentId } = req.params;
  try {
    const result = await agenticService.generateRCA(incidentId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const executeAutomation = async (req, res) => {
  const { scriptName } = req.params;
  const params = req.body;
  try {
    const result = await agenticService.executeAutomation(scriptName, params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRelatedIncidents = async (req, res) => {
  const { incidentId } = req.params;
  try {
    const result = await agenticService.getRelatedIncidents(incidentId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  launchHealthCheck,
  generateRCA,
  executeAutomation,
  getRelatedIncidents
}; 