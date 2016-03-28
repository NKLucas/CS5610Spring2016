/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);


    function HeaderController($scope, $location, UserService){
        $scope.$location = $location;
        $scope.logout = logout;

        function logout(){
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

    }
})();

