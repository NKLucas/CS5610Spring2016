/**
 * Created by Zhiyu on 2/27/16.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, UserService, $location){
        $scope.addUser = addUser;
        $scope.selectUser = selectUser;
        $scope.deleteUser = deleteUser;
        $scope.updateUser = updateUser;
        $scope.sortType     = 'username'; // set the default sort type
        $scope.sortReverse  = false;


        UserService
            .findAllUsers()
            .then(function(users){
                $scope.users = users;
            });

        function addUser(newUser){
            UserService
                .createUser(newUser)
                .then(function(users){
                    $scope.users = users;
                })
        }

        function selectUser(user){
            UserService
                .findUserById(user._id)
                .then(function(returnUser){
                    $scope.newUser = returnUser;
                })
        }

        function deleteUser(user){
            UserService
                .deleteUserById(user._id)
                .then(function(users){
                    $scope.users = users;
                })
        }

        function updateUser(user){
            UserService
                .updateUser(user._id, user)
                .then(function(users){
                    $scope.users = users;
                    $scope.newUser.username = "";
                    $scope.newUser.password = "";
                    $scope.newUser.firstName = "";
                    $scope.newUser.lastName = "";
                    $scope.newUser.roles = "";
                })
        }

    }

})();
