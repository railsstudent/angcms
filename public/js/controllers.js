'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory',
  	function($scope, $log, pagesFactory) {
  		pagesFactory.getPages().then(
  			function(response) {
  				$scope.allPages = response.data;
  			}, 
  			function(err) {	
  				$log.error(err);
  			});

  		$scope.deletePage = function _deletePage(id) {
  			pagesFactory.deletePage(id);
  		};

  }]);
