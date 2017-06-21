//
// Create a directive
//
angular.module("smart-table").directive('poop', function () {
    return {
        require: '^stTable',
        scope: {
            poop: '='
        },
        link: function (scope, element, attr, ctrl) {

            scope.$watch(function () {
                return ctrl.tableState().search;
            }, function (newValue, oldValue) {
                scope.poop(ctrl);
            }, true);
        }
    };
});

//
// In your controller
//
// $scope.poop = function (stCtrl) {
//     var filtered = stCtrl.getFilteredCollection();
// }