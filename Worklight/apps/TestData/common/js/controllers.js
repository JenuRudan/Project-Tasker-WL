angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
 // $scope.loginData = {};

 
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, $ionicModal, $timeout) {
  $scope.Projects = [
    { title: 'Project1', id: 1 },
    { title: 'Project2', id: 2 },
    { title: 'Project3', id: 3 }
  ];
 $ionicModal.fromTemplateUrl('templates/addproject.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    // Open the newproject modal
  $scope.newproject = function() {
    $scope.modal.show();
  };
    $scope.doClose = function() {
    $scope.modal.hide();
  };

})



.controller('PlaylistCtrl', function($scope, $stateParams,$ionicModal) {
	 $scope.ProjectId = $stateParams.ProjectId;
	 
	  $ionicModal.fromTemplateUrl('templates/addtask.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
 
  $scope.newtask = function() {
    $scope.modal.show();
  };
    $scope.doClose = function() {
    $scope.modal.hide();
  };

});
