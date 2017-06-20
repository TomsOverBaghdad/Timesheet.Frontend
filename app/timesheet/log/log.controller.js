(function () {
    'use strict';

    angular.module('aviProject')
        .controller('timesheetLogCtrl', timesheetLogController);

    timesheetLogController.$inject = ['timesheetService', '$stateParams', 'toastr'];
    function timesheetLogController(timesheetService, $stateParams, toastr) {
        var vm = this;
        var timesheetId = $stateParams.timesheetId;

        vm.columns = [
            { name: "User", field: "UserEmail" },
            { name: "Logged In", field: "DTStartLog" },
            { name: "Logged Out", field: "DTEndLog" },
            { name: "Comments", field: "Comments" },
        ]
        vm.timesheetLogs = [];
        vm.displayed = [];
        vm.hoursLogged = hoursLogged;
//todo move timesheet info to directive
        vm.organizationName = null;
        vm.programName = null;
        vm.timesheetName = null;


        vm.status = {};

        init();

        function init(){
            timesheetService.GetTimesheetInfo(timesheetId).then(function(timesheetInfo){
                vm.programName = timesheetInfo.programName;
                vm.organizationName = timesheetInfo.organizationName;  
                vm.timesheetName = timesheetInfo.timesheetName;
                getTimesheet();
            }, function(err){
                console.log(err);
            });
        }

        function getTimesheet(){
            vm.status = {loading: true};
            timesheetService.GetTimesheet(timesheetId).then(function(timesheetLogs){
                vm.status = {success: true};
                vm.timesheetLogs = timesheetLogs
            }, function(err){
                vm.status = {error: true};
                console.log(err);
            });
        }

        function hoursLogged(){
            var hours = 0;
            vm.displayed.forEach(function(log){
                if(!log.DTEndLog) return;
                var diff = new Date(log.DTEndLog) - new Date(log.DTStartLog);
                
            });
            return hours;
        }

        function isTimeWeird(start, end, hours){

        }
    }


}());