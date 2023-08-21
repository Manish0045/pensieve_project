const admin = require('firebase-admin')
const serviceAccount = require('./serviceApplication.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});