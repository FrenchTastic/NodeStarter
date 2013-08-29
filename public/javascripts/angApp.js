'use strict';

//var myModule = angular.module('nodestarter', ['ngRoute', '$strap.directives','ui.bootstrap']);
var myModule = angular.module('nodestarter', ['$strap.directives','ui.bootstrap', 'ArticleServiceModule']);

myModule.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/otherPage', { 
				templateUrl: 'partials/other', 
				controller: 'OtherCtrl'
			}).when('/', { 
				templateUrl: 'partials/index', 
				controller: 'IndexCtrl'
			}).when('/auth/google', { 
				templateUrl: 'auth/google', 
				controller: 'GoogleAuthCtrl'
			}).otherwise({redirectTo: '/'
			}).when('/articles/:articleId',{
				templateUrl: 'partials/articleDetail',
				controller: 'ArticleCtrl'
			});
}]);
