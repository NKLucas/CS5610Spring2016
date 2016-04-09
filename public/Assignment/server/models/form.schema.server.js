/**
 * Created by Zhiyu on 4/8/16.
 */

module.exports = function(mongoose){
    var fieldSchema = require('./field.schema.server.js')(mongoose);
    var formSchema = mongoose.Schema({
        "userId" : String,
        "title" : String,
        "fields" : [fieldSchema],
        "created" : { type: Date, default: Date.now()},
        "updated" : { type: Date, default: Date.now()}
    }, {collection: "form"});
    return formSchema;
};
