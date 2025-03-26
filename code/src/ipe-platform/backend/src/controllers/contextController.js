const { extractContext } = require('../services/contextService');

const getContext = async (req, res) => {
  const { incidentDescription } = req.body;
  try {
    const context = await extractContext(incidentDescription);
    res.json(context);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getContext };