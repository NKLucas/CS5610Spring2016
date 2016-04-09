/**
 * Created by Zhiyu on 4/8/16.
 */

module.exports = function(mongoose){
    var fieldSchema = mongoose.Schema({
        "label" : String,
        "type": {
            type: String,
            default: 'TEXT',
            enum: ['TEXT','EMAIL','TEXTAREA','OPTIONS','DATE','RADIOS','CHECKBOXES']
        },
        "placeholder": String,
        "options": [{"label": String, "value": String}]
    }, {collection: "field"});
    return fieldSchema;
};

