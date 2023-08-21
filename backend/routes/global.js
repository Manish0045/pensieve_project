const express = require('express');
const router = express.Router();

router.use('/users', require('./userRoutes'));
router.use('/gps', require('./gpsRoutes'));


module.exports = router;