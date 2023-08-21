const express = require('express');
const router = express.Router();
const gpsServices = require('../Services/gps');

router
    .get('/get', gpsServices.get)
    .post('/create', gpsServices.create)
    .post('/update', gpsServices.update)
    .delete('/delete', gpsServices.delete)
    .get('/get/:id', gpsServices.getByDeviceID)

module.exports = router;