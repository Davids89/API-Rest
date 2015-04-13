//routes.js

module.exports = function(app, Tarea){
	//obtener todos los TODO
	app.get('/api/tareas', function(req, res){
		//usamos mongoose para obtener todos los TODO
		Tarea.find(function(err, tareas){
			//si hay un error lo vamos a imprimir
			if(err)
				res.send(err);
			res.json(tareas); //retornamos todos los TODO en formato Json
		});
	});

	//creamos un todo y devolvemos todos los TODO después de la creación
	app.post('/api/tareas', function(req, res){
		//creamos el todo, la info viene de una request AJAX desde Angular
		Tarea.create({
			text : req.body.text,
			done : false
		}, function(err, tarea){
			if(err)
				res.send(err);

			//cogemos y retornamos todos los TODO despues de crear uno
			Tarea.find(function(err, tareas){
				if(err)
					res.send(err);
				res.json(tareas);
			});
		});
	});

	//borrar un TODO
	app.delete('/api/tareas/:tarea_id', function(req, res){
		Tarea.remove({
			_id : req.params.tarea_id
		}, function(err, todo){
			if(err)
				res.send(err);

			//ahora retornamos los que quedan
			Tarea.find(function(err,tareas){
				if(err)
					res.send(err);
				res.json(tareas);
			});
		});
	});

	app.get('/', function(req, res){
		res.sendfile('./public/index.html');
	});

};