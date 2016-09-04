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
                    url: '/organization/{organizationId:int}/program/{programId:int}/timesheet',
                    templateUrl: 'app/home/home.html',                    
                    controller: 'homeCtrl',
                    controllerAs: 'homeCtrl'
                });
                

        });

    }());