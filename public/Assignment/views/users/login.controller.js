/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController ($scope, $location, $rootScope, UserService){
        $scope.login = login;

        function login(user){
            var user = UserService.findUserByCredentials(user.username, user
                .password)
            if(user){
                UserService.setCurrentUser(user);
                $location.url("/profile");
            } else {
                $scope.message = "Can not find the matching Username and Password";
            }
        }
    }
})();