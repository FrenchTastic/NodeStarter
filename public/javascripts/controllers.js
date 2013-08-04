function IndexCtrl($scope) {
	$scope.title = "Les nénuphars sont mes amis";
		$scope.changeText = function()
	{
		$scope.title = $scope.steack;
	};
}

function OtherCtrl($scope) {
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
}

function GoogleAuthCtrl($scope, $http) {
	
	$http.get('/api/someJson').
		success(function(data, status, headers, config)
		{
			$scope.items = data;
		});
	
	
}
//OtherCtrl
//IndexCtrl