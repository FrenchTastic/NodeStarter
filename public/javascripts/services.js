angular.module('nodestarter.services', []).
factory('Articles', ['$http', function($http){
	return{
		getShortenArticles : function(articles){
			for (var i = 0; i < articles.length; i++) {
				articles[i].text = articles[i].text.substr(0,256) + "...";
			};
			return articles;
		},
		getArticles : function(noPage){
			//return $resource('/api/articles?page='+ $scope.currentPage, {}, {
			//	query: {method:'GET'}
			//});
			$http.get('/api/articles?page=' + noPage).success(function(data, status, headers, config){
				return data;
			});
		}


		
	}
}]);