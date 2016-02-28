/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $locaction){
        $scope.$location = $locaction;
    }
})();