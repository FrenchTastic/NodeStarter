myModule.directive('editTweet', function() {
  return{
		restrict: 'A',
		template: '<span data-ng-hide="editMode" data-ng-click="sendTweet()" class="glyphicon glyphicon-pencil pull-right" style="margin-top:10px;"></span>' +
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
	}
});


myModule.directive('tweety', function() {
	return {
		restrict: 'E',
		//template: '<span data-edit-tweet></span><h3>Let\'s people talk</h3><hr class="fine" /><blockquote data-ng-show="tweetMode" class="pull-right"><p> I don\'t give a shit about your Website</p><small> A fucking bastard</small></blockquote><textarea style="margin-bottom:20px;width:100%;" rows="4" data-ng-hide="tweetMode" ng-model="textTweet" class="pull-right"></textarea></span>',
		template: '<div class="col-12 col-sm-12 col-lg-12 box divHeader"><span data-edit-tweet></span><h3 style="color: #7A7876;">Let\'s people talk</h3><hr class="fineLine" /><div class="divContent"><blockquote data-ng-show="tweetMode"><p> I don\'t give a shit about your Website</p><small> A fucking bastard</small></blockquote><textarea style="margin-bottom:20px;width:100%;" rows="4" data-ng-hide="tweetMode" ng-model="textTweet"></textarea></span></div>',
		link: function(scope, element, attrs){
			scope.tweetMode = true;
			scope.edit = function() {
				scope.tweetMode = true;
			};
			element.find('textarea').blur(function(){
				var myTextInput = element.find('textarea');
				scope.$apply(function(){
						scope.tweetMode = true;
				});
				if(myTextInput.val())
				{
					myTextInput.val("");
					$('#tweetModal').modal('show');
				}
			});
			scope.$watch('tweetMode', function() {
				if(!scope.tweetMode)
				{
					element.find('textarea').focus();
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
		template: '<div ng-repeat="article in articles  | filter:search" ng-animate="\'animate\'" class="col-12 col-sm-7 col-lg-12 box divHeader"><h3 style="color: #7A7876;">{{article.title}}</h3><hr class="fineLine" /><div class="divContent"><img class="img-responsive" src="{{article.images[0]}}" alt="responsive" />{{article.text}}</div></div>',
		//scope: { articles: '=rpArticle'},
		link: function(scope, element, attr) {
			scope.$watch('articles', function(articles) {
				//alert('boom');
				if(scope.articles !== undefined)
				{
					
				}
			})
		}
	};
});