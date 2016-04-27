/**
 * Created by Zhiyu on 3/27/16.
 */
module.exports = function(app, tripModel){
    app.get("/api/project/traveller/:username/trip", getTripForTraveller);
    app.get("/api/project/guide/:username/trip", getTripForGuide);
    app.get("/api/project/trip/:tripId", getTripById);

    app.post("/api/project/trip/", createTrip);
    app.put("/api/project/trip/:tripId", updateTrip);
    app.delete("/api/project/trip/:tripId", deleteTrip);



    function getTripForTraveller(req, res){
        var username = req.params.username;
        tripModel
            .findTripsByTraveller(username)
            .then(function(trips){
                res.json(trips);
            });
    }

    function getTripForGuide(req, res){
        var username = req.params.username;
        tripModel
            .findTripsByGuide(username)
            .then(function(trips){
                res.json(trips);
            });
    }

    function getTripById(req, res){
        var tripId = req.params.tripId;
        tripModel
            .findTripById(tripId)
            .then(function(trip){
                res.json(trip);
            });
    }

    function createTrip(req, res){
        var trip = req.body;
        tripModel
            .createTrip(trip)
            .then(function(trip){
                res.json(trip);
            });
    }

    function updateTrip(req, res){
        var tripId = req.params.tripId;
        var trip = req.body;
        tripModel
            .updateTrip(tripId, trip)
            .then(function(new_trip){
                res.json(new_trip);
            });
    }

    function deleteTrip(req, res){
        var tripId = req.params.tripId;
        tripModel
            .removeTrip(tripId)
            .then(function(trips){
                res.json(trips);
            });
    }
};
