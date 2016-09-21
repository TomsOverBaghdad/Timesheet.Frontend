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
            return get(backendUrl + 'timesheet/' + timesheetId);
        }

        function GetLastLogged(userEmail) {
            return get(backendUrl + 'timesheet/GetLastLogged/' + userEmail);
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

        //todo move somewhere better
        function get(url){
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }
    }

}());