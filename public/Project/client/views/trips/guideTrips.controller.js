/**
 * Created by Zhiyu on 4/27/16.
 */

(function() {
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("GuideTripsController", GuideTripsController);

    function GuideTripsController($rootScope, $scope, TripService, UserService, $location){
        $scope.deleteTrip = deleteTrip;
        $scope.sortType     = 'traveller'; // set the default sort type
        $scope.sortReverse  = false;


        TripService
            .findAllTripsForGuide($rootScope.currentUser.username)
            .then(function(trips){
                $scope.trips = trips;
            })


        function deleteTrip(trip){
            TripService
                .deleteTripById(trip._id)
                .then(function(trips){
                    TripService
                        .findAllTripsForGuide($rootScope.currentUser.username)
                        .then(function(trips_needed){
                            $scope.trips = trips_needed;
                        })

                })
        }

    }

})();
