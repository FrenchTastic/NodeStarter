'use strict';

var myModule = angular.module('nodestarter', ['$strap.directives']);
	
myModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/otherPage', { 
				templateUrl: 'partials/other', 
				controller: OtherCtrl
			}).when('/', { 
				templateUrl: 'partials/index', 
				controller: IndexCtrl
			}).when('/auth/google', { 
				templateUrl: 'auth/google', 
				controller: GoogleAuthCtrl
			}).otherwise({redirectTo: '/'});
}]);