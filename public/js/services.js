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

  			if (id === 0) {
          // add page
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
  }])
  .factory('AuthService', ['$http', function($http) {
    return {
      login : function _login() {
        return $http.post('/api/login', credentials);
      },

      logout : function _logout() {
        return $http.get('/api/logout');
      }
    };
  }]);
