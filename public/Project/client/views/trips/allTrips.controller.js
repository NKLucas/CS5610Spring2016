/**
 * Created by Zhiyu on 2/27/16.
 */

(function() {
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("AllTripsController", AllTripsController);

    function AllTripsController($rootScope, $scope, TripService, UserService, $location){
        $scope.addTrip = addTrip;
        $scope.selectTrip = selectTrip;
        $scope.deleteTrip = deleteTrip;
        $scope.updateTrip = updateTrip;
        $scope.sortType     = 'traveller'; // set the default sort type
        $scope.sortReverse  = false;


        TripService
            .findAllTrips()
            .then(function(trips){
                $scope.trips = trips;
            });

        function addTrip(newTrip){
            TripService
                .createTrip(newTrip)
                .then(function(trips){
                    $scope.trips = trips;
                    $scope.newTrip.traveller = "";
                    $scope.newTrip.guide = "";
                    $scope.newTrip.startDate = "";
                    $scope.newTrip.endDate = "";
                    $scope.newTrip.city = "";
                    $scope.newTrip.state = "";
                    $scope.newTrip.totalPeople = "";
                    $scope.newTrip._id = null;
                })
        }

        function selectTrip(trip){
            TripService
                .findTripById(trip._id)
                .then(function(returnTrip){
                    delete returnTrip.startDate;
                    delete returnTrip.endDate;
                    console.log("returned Trip", returnTrip);
                    $scope.newTrip = returnTrip;
                })
        }

        function deleteTrip(trip){
            TripService
                .deleteTripById(trip._id)
                .then(function(trips){
                    $scope.trips = trips;
                })
        }

        function updateTrip(trip){
            TripService
                .updateTripById(trip._id, trip)
                .then(function(trips){
                    $scope.trips = trips;
                    $scope.newTrip.traveller = "";
                    $scope.newTrip.guide = "";
                    $scope.newTrip.startDate = "";
                    $scope.newTrip.endDate = "";
                    $scope.newTrip.city = "";
                    $scope.newTrip.state = "";
                    $scope.newTrip.totalPeople = "";
                    $scope.newTrip._id = null;
                })
        }

    }

})();
