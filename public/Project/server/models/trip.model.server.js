/**
 * Created by Zhiyu on 3/26/16.
 */

var guid = require('guid');
var q = require("q");
var bcrypt = require("bcrypt-nodejs");

// define apis that the model provide and export them.
module.exports = function(mongoose, db){

    var tripSchema = require('./trip.schema.server.js')(mongoose);
    var tripModel = mongoose.model("TripModel", tripSchema);

    var api = {
        createTrip: create,
        findAllTrips: findAllTrips,
        findTripById: findById,
        updateTrip: update,
        removeTrip: remove,
        findTripsByTraveller: findTripsByTraveller,
        findTripsByGuide: findTripsByGuide
    }
    return api;


    // define concrete functions.
    function create(trip){
        var deferred = q.defer();
        tripModel
            .create(trip, function(err, new_trip){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(new_trip);
                }
            });
        return deferred.promise;
    }

    function findAllTrips(){
        var deferred = q.defer();
        tripModel.find(function(err, trips){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(trips);
            }
        });
        return deferred.promise;
    }

    function findById(id){
        var deferred = q.defer();
        tripModel.findById(id, function(err, trip){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(trip);
            }
        });
        return deferred.promise;
    }

    function update(id, trip){
        var deferred = q.defer();

        delete trip._id;

        //var password = user.password;
        //password = bcrypt.hashSync(password);
        //delete user.password;
        //user.password = password;

        tripModel.update({_id : id}, trip,
            function(err, info) {
                tripModel.findOne({
                    _id : id
                },function(err, trip) {
                    deferred.resolve(trip);
                });
            }
        );
        return deferred.promise;
    }

    function remove(id){
        var deferred = q.defer();
        tripModel
            .remove({_id : id}, function(err, status){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findTripsByTraveller(name){
        var deferred = q.defer();
        tripModel
            .find({traveller : name},
                function(err, trips){

                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(trips);
                    }
                });
        return deferred.promise;
    }

    function findTripsByGuide(name){
        var deferred = q.defer();
        tripModel
            .find({guide : name},
                function(err, trips){

                    if (err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(trips);
                    }
        });
        return deferred.promise;

    }
};