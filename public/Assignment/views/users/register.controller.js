/**
 * Created by Zhiyu on 2/27/16.
 */

(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user){
            $scope.message = null;
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }

            var foundUser = UserService.findUserByUsername(user.username);
            if (foundUser != null) {
                $scope.message = "User already exists";
                return;
            }
            var newUser = UserService.createUser(user);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");
        }
    }
})();