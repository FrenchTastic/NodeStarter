angular.module('nodestarter.controllers', []).
controller('LayoutController', ['$scope', function($scope){
	$scope.toggleSidebar = function(e){
		$('.row-offcanvas').toggleClass('active');
	};

}])
.controller('ArticleCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('/api/article?id=' + $routeParams.articleId).success(function(data, status, headers, config){
		$scope.article = data;
	});
}])
.controller('IndexCtrl', ['$scope','$http', 'Articles', function($scope,$http, Articles) {
	
	/*var number = { 'articlesByPage' : 5 };
	$http.post('/api/artByPage', number).success(function(data, status, headers, config){
		if(status == 200)
		{
			articlesByPage = data;
			alert(data);
		}
	});*/

    $scope.title = "Les nénuphars sont mes amis";
	$scope.currentPage = 1;
	$scope.pagVisibility = false;
	//$scope.articles = Articles.getArticles($scope.currentPage);
	$http.get('/api/articles?page=' + $scope.currentPage ).success(function(data, status, headers, config){
		console.log("les articles sont rétournés :" );
		$scope.articles = Articles.getShortenArticles(data);
		//$scope.articles = data;
		
		var timer = setTimeout(function(){
	       $scope.$apply(function() {
	       	$scope.pagVisibility = true;
	       });
	    }, 600);
	});

	var articlesByPage = 1;
	$http.get('/api/artByPage').success(function(data, status, headers, config){
		if(status == 200)
		{
			articlesByPage = data;
		}
	});

	var numberOfArticles = 1;

	$http.get('/api/countArticles').success(function(data, status, headers, config){
		if(status == 200)
		{
			$scope.noOfPages = Math.ceil(data / articlesByPage);
		}
	});
	
	$scope.changeText = function()
	{
		$scope.title = $scope.steack;
	};
	
	$scope.edit = function(){
		
	};
	
	$scope.sendTweet = function(e){
		$scope.tweetMode = false;
	};




	

	$scope.detailPage = function(articleNo)
	{
		alert(articleNo);
	}
	

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
		$scope.pagVisibility = false;
		$http.get('/api/articles?page=' + pageNo).success(function(data, status, headers, config){
			console.log("les articles sont rétournés :" );
			$scope.articles = "";
			$scope.articles = Articles.getShortenArticles(data);
			var timer = setTimeout(function(){
		       $scope.$apply(function() {
		       	$scope.pagVisibility = true;
		       });
		    }, 600);
		});
	};


	$scope.tweetSubmit = function(e){
		//$(e.target).closest('.modal').
		//angular.toJson($scope.textTweet)
		var data = { 'twit': $scope.textTweet };
		$http.post('/api/tweet', data).
		success(function(data, status, headers, config)
		{
			$('.top-right').notify({
				message: { text: 'Votre Tweet a été envoyé pour approbation.'},
				type: 'info'
			}).show();
		});
	};
}])
.controller('OtherCtrl', ['$scope', function($scope){
	$scope.bananier = [
		{
			"color":"jaune",
			"variete":"afrique"
		},
		{
			"color":"rose",
			"variete":"de travers"
		}
	];	
	
}])
.controller('testController', ['$scope', 'serviceId', function($scope , serviceId){
	//alert(serviceId);
}])
.controller('GoogleAuthCtrl', ['$scope', function($scope){
	$http.get('/api/someJson').
		success(function(data, status, headers, config)
		{
			$scope.items = data;
		});
}])
.controller('AdminCtrl', ['$scope', function($scope){
	alert("tomate");
}]);