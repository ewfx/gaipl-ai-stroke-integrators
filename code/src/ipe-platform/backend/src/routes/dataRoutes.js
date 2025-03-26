const express = require('express');
const router = express.Router();
const { getTelemetryData, getEnterpriseData } = require('../controllers/dataController');

router.get('/telemetry', getTelemetryData);
router.get('/enterprise', getEnterpriseData);

module.exports = router;