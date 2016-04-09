/**
 * Created by Zhiyu on 3/26/16.
 */

var guid = require('guid');
var q = require("q");

// define apis that the model provide and export them.
module.exports = function(mongoose, db){

    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model("userModel", userSchema);

    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
        //createAllUser: createAllUser
    }
    return api;


    //function createAllUser(){
    //    userModel.create(users, function(err, users){
    //        if(err){
    //            console.log("Create all users error:", err);
    //        } else {
    //            console.log("All users created successfully!");
    //        }
    //
    //    });
    //}

    // define concrete functions.
    function create(user){
        var deferred = q.defer();
        userModel
            .create(user, function(err, new_user){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(new_user);
                }
            });
        return deferred.promise;
    }

    function findAll(){
        var deferred = q.defer();
        userModel.findAll(function(err, users){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findById(id){
        var deferred = q.defer();
        userModel.findById(id, function(err, user){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function update(id, user){
        var deferred = q.defer();
        userModel.update({_id : id}, {$set : user},
            function(err, info) {
                userModel.findOne({
                    _id : id
                },function(err, user) {
                    deferred.resolve(user);
                });
            }
        );
        return deferred.promise;
    }

    function remove(id){
        var deferred = q.defer();
        userModel
            .remove({_id : id}, function(err, status){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(name){
        var deferred = q.defer();
        userModel
            .findOne({username : name},
                function(err, user){

                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                });
        return deferred.promise;
    }

    function findUserByCredentials(credential){
        var deferred = q.defer();
        userModel
            .findOne({username : credential.username, password: credential.password},
                function(err, user){

                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
        });
        return deferred.promise;

    }
};