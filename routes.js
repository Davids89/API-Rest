//routes.js

module.exports = function(){
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

};