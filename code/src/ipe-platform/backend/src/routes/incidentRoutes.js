const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.get('/analyze', incidentController.analyzeIncident);
router.post('/propose', incidentController.proposeSolution);
router.post('/execute', incidentController.executeAction);

module.exports = router;