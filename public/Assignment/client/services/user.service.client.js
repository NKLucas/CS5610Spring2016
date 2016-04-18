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
            logout: logout,
            findAllUsers: findAllUsers,
            register: register,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserById:findUserById,
        };
        return services;

        function logout() {
            return $http.post("/api/assignment/logout");
        }


        function findUserByCredentials(username, password){
            var deferred = $q.defer();
            $http
                .post("/api/assignment/login?username=" + username + "&password=" + password)

                .success(function(res){
                    deferred.resolve(res);
                    console.log(deferred.promise);
                });
            return deferred.promise;
        }
        function findUserById(id){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/admin/user/" + id)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http
                .get("/api/assignment/admin/user")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function register(user) {
            console.log("user.service.client.js", user);
            return $http.post("/api/assignment/register", user);
        }


        function createUser(user){
            var deferred = $q.defer();
            console.log("OK, client service js, createUser");

            $http
                .post("/api/assignment/admin/user", user)
                .success(function(res){
                    deferred.resolve(res);
                    console.log("GOT THE USERS BACK")
                });
            return deferred.promise;

        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            console.log("CLIENT", userId);
            $http
                .delete("/api/assignment/admin/user/" + userId)
                .success(function(res){
                    console.log("CLIENT GOT RETURNED", res);
                    deferred.resolve(res);
                });
            return deferred.promise;

        }
        function updateUser(userId, user){
            var deferred = $q.defer();
            $http
                .put("/api/assignment/admin/user/" + userId, user)
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