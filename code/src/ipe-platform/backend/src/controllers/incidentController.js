const incidentService = require('../services/incidentService');

const analyzeIncident = async (req, res) => {
  try {
    const analysis = await incidentService.analyzeIncident();
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const proposeSolution = async (req, res) => {
  try {
    const analysis = req.body.analysis;
    const result = await incidentService.proposeSolution(analysis);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const executeAction = async (req, res) => {
  try {
    const { action } = req.body;
    const result = await incidentService.executeAction(action);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { analyzeIncident, proposeSolution, executeAction };