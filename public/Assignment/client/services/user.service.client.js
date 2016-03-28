/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope){
        var services = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return services;


        function findUserByCredentials(username, password){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username + "&password=" + password)

                .success(function(res){
                    deferred.resolve(res);
                    console.log(deferred.promise);
                });
            return deferred.promise;
        }
        function findUserByUsername(username){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user?username=" + username)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();
            console.log("OK, client service js, createUser");

            $http
                .post("/api/assignment/user", user)
                .success(function(res){
                    deferred.resolve(res);
                    console.log("GOT THE USER BACK")
                    console.log(deferred.promise);
                });
            return deferred.promise;

        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/user/" + userId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }
        function updateUser(userId, user){
            var deferred = $q.defer();
            $http
                .put("/api/assignment/user/" + userId, user)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function setCurrentUser(user){
            console.log("Set CurrentUSer");
            console.log(user);
            $rootScope.currentUser = user;
        }
        function  getCurrentUser(){
            return $rootScope.currentUser;
        }



    }

})();