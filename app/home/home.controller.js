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
                    // "Did not log out from another timesheet"
                }
                // if()
                // signInSignOut();
            }, function(err){
                console.log(err);
            });
        }    

        function signInSignOut(){
            homeService.SignInSignOut(userEmail, comment).then(function(response){

            }, function(err){

            });
        }

vm.commentsModal = commentsModal;
        function commentsModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'commentsModal.html',
                controller: 'homeCtrl',
                controllerAs: 'homeCtrl',
                size: 'sm',
                // resolve: {
                //     items: function () {
                //         return $ctrl.items;
                //     }
                // }
            });

            modalInstance.result.then(function (comment) {
                vm.comments = comment;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
        
        }


    }




}());