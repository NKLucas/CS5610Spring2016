/**
 * Created by Zhiyu on 4/7/16.
 */

module.exports = function(mongoose) {
    var userSchema = mongoose.Schema({
        "username" :String,
        "password": String,
        "firstName" : String,
        "lastName" : String,
        "email": [String],
        "phone": [String],
        "roles": [String],
        "city": String,
        "university": String,
        "state": String,
        "location": [Number]
    }, {collection: "TravelUser"});

    return userSchema;
};