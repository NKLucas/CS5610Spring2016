/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("HeaderController", HeaderController);


    function HeaderController($scope, $location, UserService, $rootScope){
        $scope.$location = $location;
        $scope.logout = logout;

        function logout()
        {
            console.log("logout called from controller");
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }

    }
})();

