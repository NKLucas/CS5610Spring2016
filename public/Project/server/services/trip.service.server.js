/**
 * Created by Zhiyu on 3/27/16.
 */
module.exports = function(app, tripModel){
    app.get("/api/project/traveller/:username/trip", getTripForTraveller);
    app.get("/api/project/guide/:username/trip", getTripForGuide);
    app.get("/api/project/trip/:tripId", getTripById);
    app.get("/api/project/trips",  findAllTrips);


    app.post("/api/project/trip/", createTrip);
    app.put("/api/project/trip/:tripId", updateTrip);
    app.delete("/api/project/trip/:tripId", deleteTrip);


    function findAllTrips(req, res){
        tripModel
            .findAllTrips()
            .then(function(trips){
                res.json(trips);
            });
    }


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
        console.log("create Trip from server service.")
        var trip = req.body;
        tripModel
            .createTrip(trip)
            .then(function(trip){
                tripModel
                    .findAllTrips()
                    .then(function(trips){
                        res.json(trips);
                    })
            });
    }

    function updateTrip(req, res){
        var tripId = req.params.tripId;
        var trip = req.body;
        tripModel
            .updateTrip(tripId, trip)
            .then(
                function(new_trip) {
                    return tripModel.findAllTrips();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(trips){
                    res.json(trips);
                },
            function(err){
                res.status(400).send(err);
            });
    }

    function deleteTrip(req, res) {
        tripModel
            .removeTrip(req.params.tripId)
            .then(
                function(trip){
                    return tripModel.findAllTrips();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(trips){
                    res.json(trips);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

};
