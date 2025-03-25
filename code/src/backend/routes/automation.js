const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Automation route working!' });
});

module.exports = router;
