(function () {
    'use strict';

    angular.module('aviProject')
        .controller('homeCtrl', homeController);

    homeController.$inject = ['homeService', '$stateParams', '$uibModal'];
    function homeController(homeService, $stateParams, $uibModal) {
        var vm = this;

        vm.userEmail = "";
        vm.emailForm = null;
        vm.comments = "";

        vm.organizationName = 'org'; //can we get this from the routing or something?
        vm.programName = 'prog';
        vm.timesheetName = 'timesheet';

        vm.TrySignInSignOut = TrySignInSignOut;

        init();

        function init(){
            //get org name and program name
            homeService.GetTimesheet($stateParams.timesheetId).then(function(timesheet){
                vm.programName = timesheet.programName;
                vm.organizationName = timesheet.organizationName;  
                vm.timesheetName = timesheet.timesheetName; 
            }, function(err){
                console.log(err);
            });
        }

        function TrySignInSignOut(){
            homeService.GetLastLogged(vm.userEmail).then(function(lastLog){
                if(lastLog != null && lastLogged.DTEndLog == null && lastLogged.TimesheetId != req.params.timesheetId) {
                    toastr.error('Did not log out from another timesheet', 'Error:');
                }else if(lastLogged.DTEndLog){
                    //sign in
                    signInSignOut();
                }else{
                    //signout, allow for comments
                    showModal();
                }
            }, function(err){
                console.log(err);
            });
        }    

        function signInSignOut(){
            homeService.SignInSignOut(vm.userEmail, vm.comments).then(function(response){
                if(response.SignIn){
                    toastr.success("Dont forget to sign out when you're done!", 'Signed In!');
                }
                else if(response.SignOut){
                    toastr.success('Nice job :)', 'Signed Out');
                }
                else{
                    toastr.error('Could not sign in or out...', 'Error:');
                }
            }, function(err){
                toastr.error('Could not sign in or out', 'Error:');
            });
        }


//move to directive
vm.isVisible = false;
        function showModal(){
            vm.isVisible = true;
            vm.comments = "";
        }
vm.cancel = cancel;
        function cancel(){
            vm.isVisible = false;
            vm.comments = "";
        }
vm.ok = ok;
        function ok(){            
            signInSignOut();
        }


    }

}());