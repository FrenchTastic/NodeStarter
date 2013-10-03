angular.module('nodeAdmin.controllers', []).
controller('LayoutController', ['$scope', function($scope){
	$scope.toggleSidebar = function(e){
		$('.row-offcanvas').toggleClass('active');
	};

}])
.controller('AdminCtrl', ['$scope', '$http', function($scope, $http){
	$scope.text = 'roger';
	
	$scope.submit = function() {
		if(!this.articleForm.$invalid)
		{
			var articleTextp =  $($.parseHTML(this.articleHtml));
			var articleText = $(this.articleHtml);
			var allImages = $(articleTextp).find('img');
			if(allImages.length != 0)
			{
				for (var i = 0; i < allImages.length; i++) {
					$(allImages[i]).replaceWith('{'+ i +'}');
					//articleText = articleText.replace(allImages[i], "{"+ i +"}" )
				};
			}
			else
			{
				allImages = [];
			}
			

			var data = JSON.stringify({title:this.article.title, text:this.articleHtml, images:allImages, featured: this.article.featured});
			$http.post('/article', data).
			success(function(data, status, headers, config)
			{
				CKEDITOR.instances.editor1.setData('');
				alert(data);
			});
		}
		else
		{
			alert("Veuillez remplir tous les champs.");
		}
		
  	};

  	$scope.loadFeaturedImage = function(e){
  		if($(featuredUrl).val())
  		{
			
  		}
  		else 
  		{
  			alert("Le titre doit être saisi.");
  		}
	};


}])
.controller('ArticlesListCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('/articlesList').success(function(data, status, headers, config){
		$scope.articles = data;
	});
}])
;