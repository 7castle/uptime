ut.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/js/angular/views/home.html',
			controller: 'HomeCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);