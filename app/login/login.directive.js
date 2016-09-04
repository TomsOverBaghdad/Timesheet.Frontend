(function () {
    'use strict';

    angular.module('aviProject')
		.directive('login', userController);

    userController.$inject = ['userService'];
    function userController(userService) {
        var vm = this;

        
    }

}());