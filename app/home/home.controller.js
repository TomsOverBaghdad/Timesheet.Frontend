(function () {
    'use strict';

    angular.module('aviProject')
		.controller('homeCtrl', homeController);

    homeController.$inject = ['homeService', '$stateParams'];
    function homeController(homeService, $stateParams) {
        var vm = this;

        vm.userEmail = "";
        vm.emailForm = null;
        vm.organization = $stateParams.organizationId; //can we get this from the routing or something?
        vm.program = $stateParams.programId;
vm.test = "";
        vm.organizations = [
        	{
        		name: 'poop',
        		programs:[
        			{
        				name: 'orange'
        			},
        			{
        				name: 'strawberry'
        			},
        			{
        				name: 'banana'
        			}
        		]
        	},
        	{
        		name: 'pee',
        		programs:[
        			{
        				name: 'cake'
        			},
        			{
        				name: 'rake'
        			},
        			{
        				name: 'lake'
        			}
        		]
        	}
        ];

		vm.logTime = logTime;

		function logTime(){
			if (!emailForm.$valid) return; 
			homeService.LogTime(vm.userEmail).then(function(log){
				if(log.loggedIn) vm.test = "signed in at " + log.time;
				else vm.test = "signed out at " + log.time
			}, function(err){
				vm.test = "could not sign in or out";
			});
		}        
    }

}());