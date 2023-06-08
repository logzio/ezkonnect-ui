const express = require('express');
const podDBController = require('../controllers/podcontrollerDB');

const router = express.Router();

router.get('/state', podDBController.getPods);
router.post('/annotate/traces', podDBController.updateTraces);
router.post('/annotate/logs', podDBController.updateLogs);

module.exports = router;
