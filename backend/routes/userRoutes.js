const express = require('express');
const router = express.Router();
const userServices = require('../Services/users');

router
    .get('/get', userServices.get)
    .post('/create', userServices.create)
    .put('/update', userServices.update)
    .post('/login', userServices.login)
    .delete('/delete', userServices.delete)

module.exports = router;