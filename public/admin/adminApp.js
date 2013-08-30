'use strict';

//var myModule = angular.module('nodeAdmin', ['ngRoute', '$strap.directives','ui.bootstrap']);
angular.module('nodeAdmin', ['$strap.directives','ui.bootstrap', 'nodeAdmin.services', 'nodeAdmin.directives', 'nodeAdmin.controllers']).
config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', { 
				templateUrl: 'partials/admin', 
				controller: 'AdminCtrl'
			}).when('/', { 
				templateUrl: 'partials/admin', 
				controller: 'AdminCtrl'
			});
}]);
