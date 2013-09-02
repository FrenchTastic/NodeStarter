angular.module('nodeAdmin.controllers', []).
controller('LayoutController', ['$scope', function($scope){
	$scope.toggleSidebar = function(e){
		$('.row-offcanvas').toggleClass('active');
	};

}])
.controller('AdminCtrl', ['$scope', function($scope){
	CKEDITOR.replace( 'editor1' );
}])
;