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
var Todo = mongoose.model('Todo', {
	text : String
});

//Rutas (pasar a otro fichero)
//obtener todos los TODO
app.get('/api/todos', function(req, res){
	//usamos mongoose para obtener todos los TODO
	Todo.find(function(err, todos){
		//si hay un error lo vamos a imprimir
		if(err)
			res.send(err);
		res.json(todos); //retornamos todos los TODO en formato Json
	});
});

//creamos un todo y devolvemos todos los TODO después de la creación
app.post('/api/todos', function(req, res){
	//creamos el todo, la info viene de una request AJAX desde Angular
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo){
		if(err)
			res.send(err);

		//cogemos y retornamos todos los TODO despues de crear uno
		Todo.find(function(err, todos){
			if(err)
				res.send(err);
			res.json(todos);
		});
	});
});

//borrar un TODO
app.delete('/api/todos/:todo_id', function(req, res){
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err)
			res.send(err);

		//ahora retornamos los que quedan
		Todo.find(function(err,todos){
			if(err)
				res.send(err);
			res.json(todos);
		});
	});
});

app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

//Escucha y lanza el servidor en el 8080
app.listen(8080);
console.log("Servidor lanzado en el puerto 8080");