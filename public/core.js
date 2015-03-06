//public/core.js

//primero creamos el modulo de angular
var davidTodo = angular.module('davidTodo',[]);

function mainController($scope, $http){
	$scope.formData = {};

	//cuando abramos la web se van a mostrar todos los TODO
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: '+data);
		});

	//cuando aceptemos el formulario de los TODO hay que mandar el texto a la API
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {}; //limpiamos el formulario
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	//borrar un TODO después de hacer check
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/'+id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: '+data);
			})
	}
}