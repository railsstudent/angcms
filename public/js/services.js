'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .factory('pagesFactory', ['$http', function($http) {
  	return {
  		getPages : function _getPages() {
  			return $http.get('/api/pages');
  		},

  		savePage : function _savePage(pageData) {
  			var id =  pageData._id;

  			// add page
  			if (id === 0) {
  				return $http.post('/api/pages/add', pageData);
  			} else {
	  			// update page
	  			return $http.post('/api/pages/update', pageData);
	  		}
  		},

  		deletePage : function _deletePage(id) {
  			return $http.delete('/api/pages/' + id);
  		},

  		getPageContent: function _getPageContent(url) {
  			return $http.get('/api/pages/admin-details/' + url);
  		}

  	};
  }]);
