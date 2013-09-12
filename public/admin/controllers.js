angular.module('nodeAdmin.controllers', []).
controller('LayoutController', ['$scope', function($scope){
	$scope.toggleSidebar = function(e){
		$('.row-offcanvas').toggleClass('active');
	};

}])
.controller('AdminCtrl', ['$scope', '$http', function($scope, $http){
	$scope.text = 'roger';
	
	$scope.submit = function() {
	var articleTextp =  $($.parseHTML(this.articleHtml));
	var articleText = $(this.articleHtml);
	var allImages = $(articleTextp).find('img');
	for (var i = 0; i < allImages.length; i++) {
		$(allImages[i]).replaceWith('{'+ i +'}');
		//articleText = articleText.replace(allImages[i], "{"+ i +"}" )
	};

	var data = JSON.stringify({title:'banane', text:this.articleHtml});
	$http.post('/article', data).
	success(function(data, status, headers, config)
	{
		alert(data);
	});
  };
}])
;