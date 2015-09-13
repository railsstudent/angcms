'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider',  '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});

 	$routeProvider.when('/admin/login', {
        templateUrl: 'partials/admin/login.html',
        controller: 'AdminLoginCtrl'
    });
    $routeProvider.when('/admin/pages', {
        templateUrl: 'partials/admin/pages.html',
        controller: 'AdminPagesCtrl'
    });
    $routeProvider.when('/admin/add-edit-page/:id', {
        templateUrl: 'partials/admin/add-edit-page.html',
        controller: 'AddEditPageCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });
  	$locationProvider.html5Mode(true);
}]);
