myModule.controller('IndexCtrl', ['$scope','$http', function($scope,$http) {
    $scope.title = "Les nénuphars sont mes amis";
		
		$http.get('/api/articles').success(function(data, status, headers, config){
			console.log("les articles sont rétournés :" );
			$scope.articles = data;
		});
		
		$scope.changeText = function()
		{
			$scope.title = $scope.steack;
		};
		
		$scope.edit = function(){
			
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
}]);

myModule.controller('OtherCtrl', ['$scope', function($scope){
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
	
}]);

myModule.controller('GoogleAuthCtrl', ['$scope', function($scope){
	$http.get('/api/someJson').
		success(function(data, status, headers, config)
		{
			$scope.items = data;
		});
}]);

//OtherCtrl
//IndexCtrl