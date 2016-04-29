/**
 * Created by Zhiyu on 2/27/16.
 */

(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $scope, UserService, $rootScope) {
        $scope.message = null;
        $scope.register = register;
        $scope.user = $rootScope.registerUser;
        $rootScope.registerUser = null;

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
            if($scope.role1 == null && $scope.role2 == null){
                $scope.message = "Please select a role";
                return
            }
            var roles = [];
            if ($scope.role1 == true){
                roles.push("traveller");
            }
            if ($scope.role2 == true){
                roles.push("guide");
            }
            console.log("role1", $scope.role1);
            console.log("role2", $scope.role2);
            user.roles = roles;
            console.log(user);


            UserService
                .register(user)
                .then(function (newUser) {
                    console.log("GOT THE USER BACK");
                    console.log("newuser: ", newUser);
                    if (newUser.data != null){
                        UserService.setCurrentUser(newUser.data);
                        $location.url("/profile");
                    } else {
                        $scope.message = "The user has already existed.";
                        return;
                    }
                });
        }
    }
})();