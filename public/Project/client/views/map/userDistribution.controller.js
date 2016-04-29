/**
 * Created by Zhiyu on 4/28/16.
 */

var users = "Take Me So Long!";

(function(){
    angular
        .module("TravelWithMe")
        .controller("UserDistributeController", UserDistributeController);

    function UserDistributeController ($scope, $location, $rootScope, UserService) {
        UserService
            .findAllUsers()
            .then(function(results){
                users = results;
            })
            .then(function(){
                var script = document.createElement('script');
                script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
                document.body.appendChild(script);

            })
    }

})();

function initialize() {
    var myLatlng = new google.maps.LatLng(37.39361,-122.099263)
    var mapOptions = {
        zoom: 2,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var markers = [];
    for ( var pos in users ) {
        var user = users[pos];
        var newLatlng = new google.maps.LatLng(user.location[0], user.location[1]);
        var marker = new google.maps.Marker({
            position: newLatlng,
            map: map,
            title: user.university+ ", " + user.city + ", " + user.state
        });
        markers.push(marker);
    }

//    var map;
//    var bounds = new google.maps.LatLngBounds();
//    var mapOptions = {
//        mapTypeId: 'roadmap',
//        zoom: 8
//    };
//
//    // Display a map on the page
//    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
//    map.setTilt(45);
//
//    // Multiple Markers
//    var markers = [
//        ['London Eye, London', 51.503454, -0.119562],
//        ['Palace of Westminster, London', 51.499633, -0.124755]
//    ];
//
//    // Info Window Content
//    var infoWindowContent = [
//        ['<div class="info_content">' +
//        '<h3>London Eye</h3>' +
//        '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' + '</div>'],
//        ['<div class="info_content">' +
//        '<h3>Palace of Westminster</h3>' +
//        '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
//        '</div>']
//    ];
//
//    // Display multiple markers on a map
//    var infoWindow = new google.maps.InfoWindow(), marker, i;
//
//    // Loop through our array of markers & place each one on the map
//    for (i = 0; i < markers.length; i++) {
//        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//        bounds.extend(position);
//        marker = new google.maps.Marker({
//            position: position,
//            map: map,
//            title: markers[i][0]
//        });
//
//        // Allow each marker to have an info window
//        google.maps.event.addListener(marker, 'click', (function (marker, i) {
//            return function () {
//                infoWindow.setContent(infoWindowContent[i][0]);
//                infoWindow.open(map, marker);
//            }
//        })(marker, i));
//
//        // Automatically center the map fitting all markers on the screen
//        map.fitBounds(bounds);
//    }
//
//    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
//        this.setZoom(14);
//        google.maps.event.removeListener(boundsListener);
//    });
}