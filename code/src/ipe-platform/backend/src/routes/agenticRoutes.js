const express = require('express');
const router = express.Router();
const {
  launchHealthCheck,
  generateRCA,
  executeAutomation,
  getRelatedIncidents
} = require('../controllers/agenticController');

// Health check routes
router.post('/health-check/:serviceId', launchHealthCheck);

// RCA routes
router.post('/rca/:incidentId', generateRCA);

// Automation routes
router.post('/automation/:scriptName', executeAutomation);

// Related incidents routes
router.get('/related-incidents/:incidentId', getRelatedIncidents);

module.exports = router; 