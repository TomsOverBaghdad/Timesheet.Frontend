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
            { name: "Count Log?" }
        ]
        vm.timesheetLogs = [];
        vm.displayed = [];
        var stFilteredCollection = null;

//todo move timesheet info to directive
        vm.organizationName = null;
        vm.programName = null;
        vm.timesheetName = null;
        vm.isTimeWeirdClass = "#ffc2c2";

        vm.status = {};

        vm.hoursLogged = hoursLogged;
        vm.badLogs = null;
        vm.poop = poop;

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
            var searchCollection = filteredCollection() || vm.timesheetLogs;
            vm.badLogs = 0;
            searchCollection.forEach(function(log) {
                if(!log.DTEndLog) return;

                var start = moment(log.DTStartLog);
                var end = moment(log.DTEndLog);
                var d = moment.duration(end - start);

                log.duration = d;
                if (!isTimeWeird(d, 5)) {
                    hours += d;
                    log.isTimeWeird = false;
                } else {
                    vm.badLogs++;
                    log.isTimeWeird = true;
                }
                
            });
            return formatDuration(moment.duration(hours));
        }

        function isTimeWeird(duration, hours){
            if (duration) {
                return duration.asHours() > 5;
            }
            return false;
        }

        function formatDuration(duration){
            var format = "";
            if(duration.days()){
                format += "Days: " + duration.days() + " ";
            } 
            if(duration.hours()){
                format += "Hours: " + duration.hours() + " ";
            } 
            if(duration.minutes()){
                format += "Minutes: " + duration.minutes() + " ";
            } 
            if(duration.seconds()){
                format += "Seconds: " + duration.seconds() + " ";
            }
            return format;
        }

        function poop(stCtrl) {
            stFilteredCollection = stCtrl;
        }

        function filteredCollection(){
            if (stFilteredCollection) {
                return stFilteredCollection.getFilteredCollection();
            }
            return null;
        }
    }


}());