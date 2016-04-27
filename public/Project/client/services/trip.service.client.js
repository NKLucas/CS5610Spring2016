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
        }
        return services;

        function createTrip(trip){
            var deferred = $q.defer();
            $http
                .post("/api/project/trip", trip)
                .success(function(res){

                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function findAllTripsForTraveller(username){
            var deferred = $q.defer();
            $http
                .get("/api/project/traveller/" + userId + "/trip")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function findAllTripsForGuide(username){
            var deferred = $q.defer();
            $http
                .get("/api/project/guide/" + userId + "/trip")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }


        function findTripById(tripId){
            var deferred = $q.defer();
            console.log(tripId, "FROM CLient Service");
            $http
                .get("/api/project/trip/" + tripId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }


        function deleteTripById(tripId){
            var deferred = $q.defer();
            console.log(tripId, "FROM CLient Service");
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