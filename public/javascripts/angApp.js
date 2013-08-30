'use strict';

//var myModule = angular.module('nodestarter', ['ngRoute', '$strap.directives','ui.bootstrap']);
angular.module('nodestarter', ['$strap.directives','ui.bootstrap', 'nodestarter.services', 'nodestarter.directives', 'nodestarter.controllers']).
config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/otherPage', { 
				templateUrl: 'partials/other', 
				controller: 'OtherCtrl'
			}).when('/', { 
				templateUrl: 'partials/index', 
				controller: 'IndexCtrl'
			}).when('/articles/:articleId',{
				templateUrl: 'partials/articleDetail',
				controller: 'ArticleCtrl'
			}).when('/pardon',{
				templateUrl: '/partials/admin',
				controller: 'AdminCtrl'
			})
			.when('/auth/google', { 
				templateUrl: 'auth/google', 
				controller: 'GoogleAuthCtrl'
			}).otherwise({redirectTo: '/'
			});
}]);
