const express = require('express');
const cors = require('cors');
const app = express();
const postgresql = require('./postgresql');
const path = require('path');
const cookieParser = require('cookie-parser')

postgresql();

app.use(express.static('public'));
app.use(express.static('dashboard'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//TODO set proper cors (cors())
// app.use(cors({
//     "Access-Control-Allow-Origin": "localhost:5173",
//     "Access-Control-Allow-Credentials": true
//   }))
app.use(cors())
app.use('/images', express.static('images'));

app.use('/', require('./routes/offers'));
app.use('/', require('./routes/tours'));
app.use('/', require('./routes/rezervations'));
app.use('/', require('./routes/customOffers'));

app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dashboard/index.html'))
})

app.use('/', require('./routes/dashboard'));

app.get("/", (req, res) => {
    res.status(404).json({
        message: "Not found"
    })
})

module.exports = app