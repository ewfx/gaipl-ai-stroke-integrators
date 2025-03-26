const express = require('express');
const router = express.Router();
const { getContext } = require('../controllers/contextController');

router.post('/extract', getContext);

module.exports = router;