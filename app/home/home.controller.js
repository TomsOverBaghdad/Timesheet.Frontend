(function () {
    'use strict';

    angular.module('aviProject')
        .controller('homeCtrl', homeController);

    homeController.$inject = ['homeService', '$stateParams', 'toastr'];
    function homeController(homeService, $stateParams, toastr) {
        var vm = this;

        vm.userEmail = "";
        vm.emailForm = null;
        vm.comments = "";

        vm.organizationName = null; //can we get this from the routing or something?
        vm.programName = null;
        vm.timesheetName = null;

        vm.status = {};
        vm.TrySignInSignOut = TrySignInSignOut;
        var timesheetId = $stateParams.timesheetId;

        init();

        function init(){
            resetUser();
            vm.status = {loading : true};
            homeService.GetTimesheet(timesheetId).then(function(timesheet){
                vm.status = {success : true};
                vm.programName = timesheet.programName;
                vm.organizationName = timesheet.organizationName;  
                vm.timesheetName = timesheet.timesheetName; 
            }, function(err){
                vm.status = {error : true};
                console.log(err);
            });
        }

        function resetUser(){
            vm.userEmail = "";
            vm.emailForm = null;
            vm.comments = "";
            vm.isVisible = false;
            console.log("resetUser");
        }

        vm.signinstatus = {};
        function TrySignInSignOut(){
            if(vm.userEmail == "") {
                toastr.info('Enter an email', "Error:");
                return;
            }            
            vm.signinstatus = {loading : true};
            homeService.GetLastLogged(vm.userEmail).then(function(lastLogged){
                vm.signinstatus = {loading : false};
                if(lastLogged == "" || lastLogged.DTEndLog){
                    //sign in
                    signInSignOut();
                }
                else if(lastLogged.TimesheetId != timesheetId) {
                    toastr.info('Did not log out from another timesheet', 'Error:');
                }else{
                    //signout, allow for comments
                    showModal();
                }
            }, function(err){
                vm.signinstatus = {error : true};
                toastr.info('Could not sign in or out', 'Error:');
                console.log(err);
            });
        }    

        function signInSignOut(){
            homeService.SignInSignOut(timesheetId, vm.userEmail, vm.comments).then(function(response){
                if(response.SignIn){
                    toastr.success("Dont forget to sign out when you're done!", 'Signed In!');
                }
                else if(response.SignOut){
                    toastr.success('Nice job :)', 'Signed Out');

                }
                else{
                    toastr.info('Could not sign in or out...', 'Error:');
                }
                resetUser();
            }, function(err){
                toastr.info('Could not sign in or out', 'Error:');
                console.log(err);
                resetUser();
            });
        }


//move to directive
vm.isVisible = false;
        function showModal(){
            vm.isVisible = true;
            vm.comments = "";
        }
vm.cancel = resetUser;
        function cancel(){
            vm.isVisible = false;
            vm.comments = "";
        }
vm.signOut = signOut;
        function signOut(){   
            console.log('signing out ' + vm.userEmail);         
            signInSignOut();
        }


    }

}());