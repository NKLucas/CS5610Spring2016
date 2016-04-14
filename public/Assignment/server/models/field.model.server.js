/**
 * Created by Zhiyu on 4/9/16.
 */
var q = require('q');

module.exports = function(app, mongoose, db){

    var formSchema = require('./form.schema.server.js')(mongoose);
    var formModel2 = mongoose.model("formModel2", formSchema);


    var api = {
        findAllFields : findAllFields,
        createField : createField,
        findField : findField,
        updateField : updateField,
        removeField : removeField
    };
    return api;

    // FIELDS APIS

    function createField(formId, field) {
        var deferred = q.defer();
        formModel2.update({_id : formId}, {$push:{fields:field}}, function(err, status){
            formModel2.findById(formId, function(err, form){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields);
                }
            })
        });
        return deferred.promise;
    }

    function findAllFields(formId) {
        var deferred = q.defer();
        formModel2.findById(formId, function(err, form){
            if (err){
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });
        return deferred.promise;
    }

    function findField(formId, fieldId) {
        var deferred = q.defer();
        formModel2.findById(formId, function(err, form){
            form.fields.findById(fieldId, function(err, field){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(field);
                }
            })

        });
        return deferred.promise;
    }


    function updateField(formId, fieldId, newField) {
        var deferred = q.defer();
        formModel2.findById(formId, function (err, form) {
            if (err){
                deferred.reject(err);
            }else {
                for(var i in form.fields){
                    if (form.fields[i]._id == fieldId) {
                        form.fields[i]._id = fieldId;
                        form.fields[i].label = newField.label;
                        form.fields[i].type = newField.type;
                        form.fields[i].placeholder = newField.placeholder;
                        form.fields[i].options = newField.options;
                    }
                }
                form.save();
                deferred.resolve(newField);
            }
        });
        return deferred.promise;


    }


    function removeField(formId, fieldId) {
        var deferred = q.defer();
        formModel2.findById(formId, function(err, form){
            if (err){
                deferred.reject(err);
            } else {
                for (var i in form.fields){
                    if (form.fields[i]._id == fieldId){
                        form.fields.splice(i, 1);
                    }
                }
                form.save();
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }
};