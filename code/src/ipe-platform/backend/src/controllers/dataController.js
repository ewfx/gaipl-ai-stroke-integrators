const { processTelemetryData, processEnterpriseData } = require('../services/dataService');

const getTelemetryData = async (req, res) => {
  try {
    const data = await processTelemetryData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEnterpriseData = async (req, res) => {
  try {
    const data = await processEnterpriseData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTelemetryData, getEnterpriseData };