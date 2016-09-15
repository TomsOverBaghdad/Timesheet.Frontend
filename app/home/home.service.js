(function () {
    'use strict';
    
    angular.module('aviProject')
        .factory('homeService', homeService);
    
    homeService.$inject = ['$http', '$q'];
    function homeService($http, $q) {
        var service = {};

        service.GetTimesheet = GetTimesheet;
        service.GetLastLogged = GetLastLogged;
        service.SignInSignOut = SignInSignOut;

        return service;

        function GetTimesheet(timesheetId){
            return $http.jsonp('localhost:3000/api/timesheet/' + timesheetId)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }

        function GetLastLogged(userEmail) {
            return $http.get('localhost:3000/api/timesheet/GetLastLogged/' + userEmail)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        } 

        function SignInSignOut(timesheetId, userEmail, userComments) {
            var params = JSON.stringify({comments: userComments});
            return $http.post('localhost:3000/api/timesheet/' + timesheetId + '/Log/' + userEmail, params)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }   
    }

}());