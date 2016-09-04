(function () {
    'use strict';
    
    angular.module('aviProject')
        .factory('userService', userService);
    
    userService.$inject = ['$http', '$q'];
    function userService($http, $q) {
        var service = {};

        service.user = null;

        return service;
    }

}());