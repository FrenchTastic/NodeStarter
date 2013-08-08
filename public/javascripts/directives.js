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
				scope.$apply(function(){
					scope.editMode = false;
					element.find('input').val("");
					$('#tweetModal').modal('show');
				});
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