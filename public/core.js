angular.module('salesforce', [])
.controller('salesforceController', function($scope, $http) {
	$scope.formData = {}; 
	$scope.records = {};
	//called when index.html loaded...

	$http.get('/show') //trigger express /show get
	.success(function(data) {
		$scope.records = data; //load records from JSON return in index.js get
		$scope.getTotal();	   //get number of records from JSON get
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
	
	$scope.parseJSON = function(json) {
		return JSON.parse(json);
	}

	$scope.getTotal = function() {	//gets the total number of records
		$http.get('/total')			//trigger express /total get
		.success(function(data) {
			$scope.total = data;	//update total from JSON return
			console.log(data + ' records');
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.create = function() {	//creates a new record to salesforce
		$http.post('/', $scope.formData)	//triggered on a POST from root of Angular page
		.success(function(data) {
			$scope.getTotal(); //update total
			$scope.formData = {}; //reset form
			$scope.showRecords(); //refresh records
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	$scope.showRecords = function() {	//gets the records
		$http.get('/show')			//trigger express /show get
		.success(function(data) {
			$scope.records = data;	//update records from JSON return
			console.log(data + ' records');
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}

});
