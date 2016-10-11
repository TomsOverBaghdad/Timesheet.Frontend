(function () {
    'use strict';

    var app = angular.module('aviProject', ['ui.router', 'ui.bootstrap', 'toastr', 'smart-table']);
    app.constant('backendUrl', 'https://serene-brook-34302.herokuapp.com/');
    // app.constant('backendUrl', 'localhost:3000/');

}());