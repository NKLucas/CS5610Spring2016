/**
 * Created by Zhiyu on 3/26/16.
 */

// get users from the mock file.
var users = require("./user.mock.json");
var guid = require('guid');

// define apis that the model provide and export them.
module.exports = function(app){
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }
    return api;

    // define concrete functions.
    function create(user){
        var new_user = {
            _id: guid.create(),
            username: user.username,
            password: user.password,
            email: user.email
        };
        users.push(new_user);
        return new_user;
    }

    function findAll(){
        return users;
    }

    function findById(id){
        for(var u in users){
            if (users[u]._id == id){
                return users[u];
            }
        }
        return null;
    }

    function update(id, user){
        for (var i = 0; i < users.length; i++){
            console.log(users[i]._id, id, users[i]._id == id, users[i]);
            if (users[i]._id == id){
                users[i] ={
                    _id : user._id,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    username : user.username,
                    password : user.password,
                    email : user.email
                }
                return users[i];
            }
        }
        return null;
    }

    function remove(id){
        for (var i = 0; i < users.length; i++){
            if (users[i]._id == id){
                users.splice(i, 1);
            }
        }
        return users;
    }

    function findUserByUsername(name){
        for (var u in users){
            if (users[u].username == name){
                return users[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credential){
        for (var u in users){
            if (credential.username == users[u].username && credential.password == users[u].password){
                return users[u];
            }
        }
        return null;
    }
};