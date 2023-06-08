const express = require('express');
const podController = require('../controllers/podcontroller');

const router = express.Router();

router.get('/state', podController.getPods);
router.post('/annotate/traces', podController.updateTraces);
router.post('/annotate/logs', podController.updateLogs);

module.exports = router;
