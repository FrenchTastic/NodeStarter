angular.module('nodestarter.services', []).
factory('Articles', function(){
	return{
		getShortenArticles : function(articles){
			alert(articles[0].text);
		}
	}
});