/**
 * Created by Zhiyu on 3/26/16.
 */
module.exports = function(app, mongoose, db) {
    var userModel = require("./models/user.model.server.js")(mongoose, db);
    var tripModel = require("./models/trip.model.server.js")(mongoose, db);
    //var fieldModel = require("./models/field.model.server.js")(mongoose, db);

    var userService = require("./services/user.service.server.js")(app, userModel, tripModel);
    var tripService = require("./services/trip.service.server.js")(app, tripModel);
    //var fieldService = require("./services/field.service.server.js")(app, fieldModel);
};