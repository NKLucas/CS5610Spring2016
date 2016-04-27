/**
 * Created by Zhiyu on 4/8/16.
 */

module.exports = function(mongoose){
    var tripSchema = mongoose.Schema({
        "travller" : String,
        "guide" : String,
        "city": String,
        "state": String,
        "startDate": Date,
        "endDate": Date,
        "totalPeople": Number,
        "created" : { type: Date, default: Date.now()},
    }, {collection: "trip"});
    return tripSchema;
};
