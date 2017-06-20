(function () {
    'use strict';

    angular.module('aviProject')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');

            $stateProvider
                // .state('home', {
                //     url: '/home',
                //     templateUrl: 'app/home/home.html',                    
                //     controller: 'homeCtrl',
                //     controllerAs: 'homeCtrl'
                // })
                .state('timesheet', {
                    url: '/timesheet/{timesheetId:int}',
                    templateUrl: 'app/timesheet/timesheet.html',                    
                    controller: 'timesheetCtrl',
                    controllerAs: 'timesheetCtrl'
                })
                .state('timesheetLog', {
                // .state('program.timesheet', {
                    url: '/timesheetLog/{timesheetId:int}',
                    templateUrl: 'app/timesheetLog/timesheetLog.html',                    
                    controller: 'timesheetLogCtrl',
                    controllerAs: 'timesheetLogCtrl'
                });
                

        });

    }());