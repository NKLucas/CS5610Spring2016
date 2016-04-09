/**
 * Created by Zhiyu on 4/9/16.
 */
var q = require('q');

module.exports = function(app, mongoose, db){

    var formSchema = require('./form.schema.server.js')(mongoose);

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
        var form = findById(formId);
        //var newField = {
        //    _id : guid.create(),
        //    label : field.label,
        //    type : field.type,
        //    placeholder : field.placeholder,
        //    options : field.options
        //};
        //if (form.fields != null){
        //    form.fields.push(newField);
        //}else{
        //    form.fields = [newField];
        //}
        //return form.fields;


        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
            console.log("formbyId",form);
            form.fields.create(field, function(err, anything){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields);
                }
            });
            //form.save(function(err, form){
            //    deferred.resolve(form.fields);
            //});

        });

        return deferred.promise;
    }

    function findAllFields(formId) {
        //var form = findById(formId);
        //var fields = [];
        //if(form != null) {
        //    fields = form.fields;
        //}
        //return fields;
        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
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
        formModel.findById(formId, function(err, form){
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
        var field = findField(formId, fieldId);
        field._id = newField._id;
        field.label = newField.label;
        field.type = newField.type;
        field.placeholder = newField.placeholder;
        field.options = newField.options;
        return field;
    }


    function removeField(formId, fieldId) {
        //var form = findById(formId);
        //for(var i = 0; i < form.fields.length; i++) {
        //    if(form.fields[i]._id == fieldId) {
        //        form.fields.splice(i, 1);
        //    }
        //}
        //return form.fields;

        var deferred = q.defer();
        formModel.findById(formId, function(err, form){
            form.fields.remove({_id:fieldId}, function(err, status){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(form.fields);
                }
            })

        });
        return deferred.promise;
    }
};
