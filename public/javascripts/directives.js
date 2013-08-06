myModule.directive('editTweet', function($location) {
  return{
		restrict: 'A',
		template: '<span ng-hide="editMode" ng-click="edit()" class="glyphicon glyphicon-pencil pull-right" style="margin-top:10px;"></span>' +
		'<input type="text" ng-show="editMode" class="pull-right" style="margin-top:10px;"></span>',
		link: function(scope, element, attrs){
			scope.editMode = false;
			scope.edit = function() {
				scope.editMode = true;
			};
		}
	};
});