//server.js

//imports
var express = require('express');
var app = express(); //aqui creamos nuestra app con express
var mongoose = require('mongoose');	//mongoose para la interacción con la base de datos
var morgan = require('morgan');	//morgan para mostrar las request por el terminal (express4)
var bodyParser = require('body-parser'); //para recoger la información de los formularios (express4)
var methodOverride = require('method-override'); //simular PUT y DELETE (express4)

//Configuración

mongoose.connect('mongodb://localhost/apiRest'); //conectamos con la base de datos
app.use(express.static(__dirname + '/public')); //aqui configuramos los archivos estaticos en el directorio public
app.use(morgan('dev')); //configuración de morgan
app.use(bodyParser.urlencoded({ 'extended' : 'true' })); //para parsear application/x-www-form-urlencoded
app.use(bodyParser.json()); //parsear application/json
app.use(bodyParser.json({ type : 'application/vnd.api+json' })); //parsear application/vnd.api+json
app.use(methodOverride());

//definimos el modelo (se pasará a otro archivo)
var Tarea = mongoose.model('Tarea', {
	text : String
});

//Rutas (pasar a otro fichero)
require('./routes.js')(app, Tarea);

//Escucha y lanza el servidor en el 8080
app.listen(8080);
console.log("Servidor lanzado en el puerto 8080");