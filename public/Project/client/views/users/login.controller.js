/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService){
        $scope.login = login;

        function login(user){
            console.log("HELLO FROM CONTROLLER  -- login")
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(returnUser){
                    if(returnUser){
                        UserService.setCurrentUser(returnUser);
                        $location.url("/profile");
                    } else {
                        $scope.message = "Can not find the matching Username and Password";
                    }
                })

        }
    }
})();