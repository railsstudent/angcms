angular.module('message.flash', [])
 .factory('flashMessageService', ['$rootScope', 
 	function($rootScope) {
 		var message = '';
 		return {
 			getMessage: function _getMessage() {
 				return message;
 			},
 			setMessage : function _setMessage(newMessage) {
 				message = newMessage;
 				$rootScope.$broadcast('NEW_MESSAGE');
 			}
 		};
 }]);