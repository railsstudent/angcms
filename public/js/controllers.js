'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
  	function($scope, $log, pagesFactory) {
  		pagesFactory.getPages().then(
  			function(response) {
  				$scope.allPages = response.data;
          $log.log(response.data);
  			}, 
  			function(err) {	
  				$log.error(err);
  			});

  		$scope.deletePage = function _deletePage(id) {
  			pagesFactory.deletePage(id);
  		};

  }])
  .controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 
      'AuthService', '$log', 'flashMessageService',
    function($scope, $location, $cookies, AuthService, $log, flashMessageService) {

      $scope.credentials = {
        username : '',
        password: ''
      }

      $scope.login = function _login(credentials) {
        AuthService.login(credentials).then(
          function(res, err) {
            $cookies.loggedInUser = res.data;
            $location.path('/admin/pages');
          },
          function(err) {
            $log.log(err);
          });
      };
  }]);
