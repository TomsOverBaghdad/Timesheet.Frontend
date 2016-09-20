(function () {
    'use strict';
    
    angular.module('aviProject')
        .factory('homeService', homeService);
    
    homeService.$inject = ['$http', '$q', 'backendUrl'];
    function homeService($http, $q, backendUrl) {
        var service = {};

        service.GetTimesheet = GetTimesheet;
        service.GetLastLogged = GetLastLogged;
        service.SignInSignOut = SignInSignOut;

        return service;

        function GetTimesheet(timesheetId){
            return $http.get(backendUrl + 'timesheet/' + timesheetId)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }

        function GetLastLogged(userEmail) {
            return $http.get(backendUrl + 'timesheet/GetLastLogged/' + userEmail)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        } 

        function SignInSignOut(timesheetId, userEmail, userComments) {
            var params = JSON.stringify({comments: userComments});
            return $http.post(backendUrl + 'timesheet/' + timesheetId + '/Log/' + userEmail, params)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }   
    }

}());