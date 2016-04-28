/**
 * Created by Zhiyu on 4/28/16.
 */

(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("PreRegisterController", PreRegisterController);

    function PreRegisterController ($scope, $location, $rootScope, UserService){
        $scope.locate = locate;
        //document.getElementById('map').src="https://www.google.com/maps/embed/v1/place?key=AIzaSyChm5QMhdgTwJON3gI-v6OvhlbOUFkDFPw&q=Northeastern+University&zoom=12";

        function locate(user){
            if(user == null){
                $scope.message = "Please fill the fields below";
                return
            }
            if(user.university == null){
                $scope.message = "Please tell us the University you are attending";
                return
            }
            if(user.city == null){
                $scope.message = "Please fill in the City information";
                return
            }
            if(user.state == null){
                $scope.message = "Please fill the State information";
                return
            }
            var preEmbed = "https://www.google.com/maps/embed/v1/place?key=AIzaSyChm5QMhdgTwJON3gI-v6OvhlbOUFkDFPw&q=";
            var postEmbed = "&zoom=12";
            var mid = "";
            var university = user.university.split(" ");
            for(var i in university){
                mid = mid + university[i] + "+";
            }
            mid += user.city;
            mid += "+" + user.state;
            var embedUrl = preEmbed + mid + postEmbed;
            document.getElementById('map').src= embedUrl;
            $rootScope.university = user.university;
            $rootScope.city = user.city;
            $rootScope.state = user.state;

            var preGeo = "https://maps.googleapis.com/maps/api/geocode/json?address=";
            var geoURl = preGeo + mid;
            console.log("geoURL", geoURl);

            $.ajax({
                url: geoURl,
                jsonp: "callback",
                dataType: "json",
                success: function(data){
                    $rootScope.location = [];
                    if (data.status != "OK"){
                        return
                    } else {
                        $rootScope.location.push(data.results[0].geometry.location.lat);
                        $rootScope.location.push(data.results[0].geometry.location.lng);
                        console.log("This is root location", $rootScope.location)
                    }
                    $rootScope.registerUser = {
                        university:user.university,
                        city:user.city,
                        state:user.state,
                        location: $rootScope.location
                    }

                }
            });

            $scope.show = "True";
        }

        //function renderDetails(data){
        //    $rootScope.location = [];
        //    if (data.status != "OK"){
        //        return
        //    } else {
        //        $rootScope.location.push(data.results[0].geometry.location.lat);
        //        $rootScope.location.push(data.results[0].geometry.location.lng);
        //        console.log("This is root location", $rootScope.location)
        //    }
        //}
    }
})();
