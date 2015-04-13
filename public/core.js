//public/core.js

//primero creamos el modulo de angular
angular.module('davidTodo',[])

.controller('mainController', function ($scope, $http){
	$scope.formData = {};

	//cuando abramos la web se van a mostrar todos los TODO
	$http.get('/api/tareas')
		.success(function(data){
			$scope.tareas = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: '+data);
		});

	//cuando aceptemos el formulario de los TODO hay que mandar el texto a la API
	$scope.createTodo = function(){
		$http.post('/api/tareas', $scope.formData)
			.success(function(data){
				$scope.formData = {}; //limpiamos el formulario
				$scope.tareas = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	//borrar un TODO después de hacer check
	$scope.deleteTodo = function(id){
		$http.delete('/api/tareas/'+id)
			.success(function(data){
				$scope.tareas = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+data);
			})
	}
})