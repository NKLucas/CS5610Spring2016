
(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("NewTripController", NewTripController);

    function NewTripController($location, $scope, TripService, $rootScope) {
        $scope.message = null;
        $scope.createTrip = createTrip;

        function createTrip(trip){
            console.log(trip);
            $scope.message = null;
            if (trip == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!trip.traveller) {
                $scope.message = "Please provide a Traveller name";
                return;
            }
            if (!trip.guide) {
                $scope.message = "Please provide a Guide name";
                return;
            }
            if (!trip.startDate || !trip.endDate) {
                $scope.message = "Please provide a Date";
                return;
            }
            if (trip.startDate > trip.endDate) {
                $scope.message = "Please select a valid start and end date of the trip";
                return;
            }
            if (!trip.city) {
                $scope.message = "Please provide a City";
                return;
            }

            if (!trip.state) {
                $scope.message = "Please provide a State";
                return;
            }

            if (!trip.totalPeople) {
                $scope.message = "Please provide the total travellers of this trip";
                return;
            }

            TripService
                .createTrip(trip)
                .then(function (newTrip) {
                    console.log("GOT THE Trip BACK");
                    console.log("newtrip: ", newTrip);
                    $location.url("/mytrips");
                });
        }
    }
})();/**
 * Created by Zhiyu on 4/26/16.
 */
