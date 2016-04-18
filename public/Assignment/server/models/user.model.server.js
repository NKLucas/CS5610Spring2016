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
        createUser: create,
        findAllUsers: findAllUsers,
        findUserById: findById,
        updateUser: update,
        removeUser: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    }
    return api;


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

    function findAllUsers(){
        var deferred = q.defer();
        userModel.find(function(err, users){
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
                //console.log("findBYIDUSER", id, user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function update(id, user){
        var deferred = q.defer();

        delete user._id;
        userModel.update({_id : id}, user,
            function(err, info) {
                userModel.findOne({
                    _id : id
                },function(err, new_user) {
                    deferred.resolve(new_user);
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