myModule.directive('editTweet', function() {
  return{
		restrict: 'A',
		template: '<span data-ng-hide="editMode" data-ng-click="edit()" class="glyphicon glyphicon-pencil pull-right" style="margin-top:10px;"></span>' +
		'<input type="text" data-ng-show="editMode" ng-model="textTweet" class="pull-right" style="margin-top:10px;"></span>',
		link: function(scope, element, attrs){
			scope.editMode = false;
			scope.edit = function() {
				scope.editMode = true;
			};
			element.find('input').blur(function(){
				var myTextInput = element.find('input');
				scope.$apply(function(){
						scope.editMode = false;
					});
				if(myTextInput.val())
				{
					
					myTextInput.val("");
					$('#tweetModal').modal('show');
				}
			});
			scope.$watch('editMode', function() {
				if(scope.editMode)
				{
					element.find('input').focus();
				}
			});
		}
	};
});

myModule.directive('sendModal', function() {
  return{
		restrict: 'E,A',
		templateUrl: 'modal.html'
	};
});

myModule.directive('btnSubmitTweet', function() {
  return{
		restrict: 'A',
		link: function(scope, element, attrs){
			element.bind("click", function(){
				$(element).closest('.modal').modal("hide");
			});
		}
	};
});

myModule.directive('rpArticle', function(){
	return {
		restrict: 'E,A',
		template: '<div ng-repeat="article in articles" class="col-12 col-sm-7 col-lg-7 box divHeader"><h3>{{article.title}}</h3><hr class="fineLine" /><div style="float:left;"><img class="img-responsive" src="{{article.images[0]}}" alt="responsive" /></div><div class="divContent">{{article.text}}</div></div>',
		scope: { articles: '=rpArticle'},
		link: function(scope, element, attr) {
			scope.$watch('articles', function(articles) {
				if(scope.articles !== undefined)
				{
					
				}
			})
		}
	};
});