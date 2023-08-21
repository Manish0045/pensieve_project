require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.use(cors());

app.use('/', require('./routes/global'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running or PORT ${PORT}`);
})