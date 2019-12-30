const http = require('http');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(3000, (req, res) => {
    console.log('Server on port 3000');
})
