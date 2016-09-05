(function () {
    'use strict';

    angular.module('aviProject')
        .controller('homeCtrl', homeController);

    homeController.$inject = ['homeService', '$stateParams'];
    function homeController(homeService, $stateParams) {
        var vm = this;

        vm.userEmail = "";
        vm.emailForm = null;
        vm.organizationName = 'org'; //can we get this from the routing or something?
        vm.programName = 'prog';

        vm.logTime = logTime;

        init();

        function init(){
            //get org name and program name
            homeService.GetProgram($stateParams.programId).then(function(program){
                // vm.programName = program.name;
                // vm.organizationName = program.organizationName;   
                console.log(program);
            }, function(err){
                // vm.test = "could not sign in or out";
                console.log("error: \n");
                console.log(err);
            });
        }

        function logTime(){
            if (!emailForm.$valid) return; 
            // homeService.LogTime(vm.userEmail).then(function(log){
            //  if(log.loggedIn) vm.test = "signed in at " + log.time;
            //  //ask for comments for that day
            //  else vm.test = "signed out at " + log.time
            // }, function(err){
            //  vm.test = "could not sign in or out";
            // });
        }        
    }

}());