const http = require('http');
const express = require('express');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();



//Requiero la configuración de los eventos en socket-events
const socketEvents = require('./socket-events');

//Seteo la nueva forma de iniciar el esquema en mongodb con mongoose
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({
    extended: true,
}));

// Uso de body parser para recibir o restringir el tipo y el tamaño de información que voy a recibir
app.use(bodyParser.json({
    limit: '5mb'
}));



//Configuración para handlebar
app.set('views', 'views');
app.use(express.static('./public'));
app.set('view engine', 'html');
app.engine('html', consolidate.handlebars);



//Hago la conexión a la DB
const db = 'mongodb+srv://yacamo04:yaz.456@geolocalization-bukka.mongodb.net/uberForx?retryWrites=true&w=majority';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(value => {
    console.log("Database is connect");
    console.log(value.model)
}).catch(error => {
    console.log(error);
});


//Requiero las rutas
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(require('./routes/routes'))



//Inicializo el servidor
const server = http.Server(app);

const portNumber = 3000;


server.listen(portNumber, (req, res) => {
    console.log(`Server listening at port ${portNumber}`);
    socketEvents.initialize(server);
});
