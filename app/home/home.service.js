(function () {
    'use strict';
    
    angular.module('aviProject')
        .factory('homeService', homeService);
    
    homeService.$inject = ['$http', '$q'];
    function homeService($http, $q) {
        var service = {};

        service.LogTime = LogTime;
        service.GetProgramInfo = GetProgramInfo;

        return service;

        function GetProgram(programId){
            return $http.get('localhost:3000/')
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject(response);
                });
        }

        function LogTime(userEmail) {
            return {
                        loggedIn: true,
                        time: "4 hours"
                    };
            // return $http.get('./api/Organization/GetRequests/')
            //     .then(function (response) {
            //         return response.data;
            //     }, function (response) {
            //         return $q.reject(response);
            //     });
        }   
    }

}());