/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .factory("TripService", TripService);

    function TripService($http, $q, $rootScope){

        var services =
        {
            createTrip: createTrip,
            findAllTripsForTraveller: findAllTripsForTraveller,
            findAllTripsForGuide: findAllTripsForGuide,
            deleteTripById: deleteTripById,
            updateTripById: updateTripById,
            findTripById:findTripById,
            findAllTrips:findAllTrips
        }
        return services;

        function findAllTrips() {
            var deferred = $q.defer();
            $http
                .get("/api/project/trips")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;
        }

        function findTripById(trip_Id){
            var deferred = $q.defer();
            $http
                .get("/api/project/trip/" + trip_Id)
                .success(function(res){
                    deferred.resolve(res);
                })
            return deferred.promise;
        }

        function createTrip(trip){
            var deferred = $q.defer();
            $http
                .post("/api/project/trip/", trip)
                .success(function(res){

                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function findAllTripsForTraveller(username){
            var deferred = $q.defer();
            $http
                .get("/api/project/traveller/" + username + "/trip")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function findAllTripsForGuide(username){
            var deferred = $q.defer();
            $http
                .get("/api/project/guide/" + username + "/trip")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }


        function findTripById(tripId){
            var deferred = $q.defer();
            $http
                .get("/api/project/trip/" + tripId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }


        function deleteTripById(tripId){
            var deferred = $q.defer();
            $http
                .delete("/api/project/trip/" + tripId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function updateTripById(tripId, trip) {
            var deferred = $q.defer();
            $http
                .put("/api/project/trip/" + tripId, trip)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }
    }
})();