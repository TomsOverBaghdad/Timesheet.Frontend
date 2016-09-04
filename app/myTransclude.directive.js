(function () {
    'use strict';
    
    //but this allows for control of what scope we want the transclusion
    angular.module('aviProject')
        .directive('myTransclude', function () {
            return {
                restrict: 'EA',
                link: function ($scope, $element, $attrs, controller, $transclude) {
                    if (!$transclude) {
                        throw minErr('ctTransclude')('orphan',
                            'Illegal use of ngTransclude directive in the template! ' +
                            'No parent directive that requires a transclusion found. ' +
                            'Element: {0}',
                            startingTag($element));
                    }

                    var iScopeType = $attrs['ctTransclude'] || 'sibling';

                    switch (iScopeType) {
                        case 'sibling':
                            $transclude(function (clone) {
                                $element.empty();
                                $element.append(clone);
                            });
                            break;
                        case 'parent':
                            $transclude($scope, function (clone) {
                                $element.empty();
                                $element.append(clone);
                            });
                            break;
                        case 'child':
                            var iChildScope = $scope.$new();
                            $transclude(iChildScope, function (clone) {
                                $element.empty();
                                $element.append(clone);
                                $element.on('$destroy', function () {
                                    iChildScope.$destroy();
                                });
                            });
                            break;
                    }
                }
            }
        });

})();