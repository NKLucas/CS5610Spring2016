/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope){
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];
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
            for (var u in users){
                if (users[u].username == username && users[u].password == password){
                    return users[u];
                }
            }
            return null;
        }
        function findUserByUsername(username){
            for (var u in users){
                if (users[u].username == username){
                    return users[u];
                }
            }
            return null;
        }

        function findAllUsers() {
            return users;
        }

        function createUser(user){
            var user = {
                _id:(new Date).getTime(),
                username:user.username,
                password:user.password
            }
            users.push(user);
            return user;

        }

        function deleteUserById(userId){

        }
        function updateUser(userId, user){
            var target = null;
            for (var u in users) {
                if (users[u]._id == userId) {
                    target = users[u];
                    break;
                }
            }
            if (target != null){
                target.firstName = user.firstName;
                target.lastName = user.lastName;
                target.username = user.username;
                target.password = user.password;
            }

            return target;
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }
        function  getCurrentUser(){
            return $rootScope.currentUser;
        }



    }

})();