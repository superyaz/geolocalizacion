const http = require('http');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();


app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

app.set('views', 'views');
app.use(express.static('./public'));

app.set('view engine', 'html');
app.engine('html', consolidate.handlebars);

//Connect to Database

const db = 'mongodb://localhost:27017/uberForX';
mongoose.connect(db).then(value => {
    console.log(value.model)
}).catch(error => {
    console.log(error);
});


//Requiero la ruta
app.get('/', (req, res) => {
    res.send('Hello World');
});

const server = http.server(app);

const portNumber = 3000;


server.listen(portNumber, (req, res) => {
    console.log('Server on port 3000');
});
