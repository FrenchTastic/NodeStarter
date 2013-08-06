myModule.directive('editTweet', function() {
  return{
		restrict: 'A',
		template: '<span data-ng-hide="editMode" data-ng-click="edit()" class="glyphicon glyphicon-pencil pull-right" style="margin-top:10px;"></span>' +
		'<input type="text" data-ng-show="editMode" class="pull-right" style="margin-top:10px;"></span>',
		link: function(scope, element, attrs){
			scope.editMode = false;
			scope.edit = function() {
				scope.editMode = true;
			};
			element.find('input').blur(function(){
				scope.$apply(function(){
					scope.editMode = false;
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