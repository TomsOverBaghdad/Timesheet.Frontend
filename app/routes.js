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
                .state('home', {
                // .state('program.timesheet', {
                    url: '/timesheet/{timesheetId:int}',
                    templateUrl: 'app/home/home.html',                    
                    controller: 'homeCtrl',
                    controllerAs: 'homeCtrl'
                });
                

        });

    }());