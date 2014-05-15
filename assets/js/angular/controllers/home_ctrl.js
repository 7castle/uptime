ut.controller('HomeCtrl', function($scope, $sails) {
	$scope.checks = [];

	// get checks
	$sails.get("/checks").
	success(function (data) {
		$scope.checks = data;
	}).
	error(function (data) {
		console.log(data);
	});

	
});