/**
 * Created by Zhiyu on 3/26/16.
 */
var q = require('q');

module.exports = function(app, mongoose, db){

    var formSchema = require('./form.schema.server.js')(mongoose);
    var formModel = mongoose.model("formModel", formSchema);


    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findFormByTitle: findFormByTitle,

        findAllFields : findAllFields,
        createField : createField,
        findField : findField,
        updateField : updateField,
        removeField : removeField
    };
    return api;

    // define functions.

    function create(userId, formForTitle){
        var deferred = q.defer();
        var form = {
            userId: userId,
            title: formForTitle.title
        }
        formModel
            .create(form, function(err, new_form){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(new_form);
                }
            });
        return deferred.promise;
    }

    function findAll(userId){
        var deferred = q.defer();
        formModel
            .find({userId:userId},function(err, forms){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(forms);
                }
            });
        return deferred.promise;
    }

    function findById(id){
        var deferred = q.defer();
        formModel
            .findById(id,function(err, form){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;
    }

    function update(id, new_name){
        var deferred = q.defer();
        formModel.update({_id : id}, {$set : {title: new_name.title}},
            function(err, info) {
                formModel.findOne({
                    _id : id
                },function(err, new_form) {
                    deferred.resolve(new_form);
                });
            }
        );
        return deferred.promise;
    }

    function remove(id){
        var deferred = q.defer();
        formModel
            .remove({_id : id}, function(err, status){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title){
        var deferred = q.defer();
        formModel
            .findOne({title : title}, function(err, form){
                if (err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(form);
                }
            });
        return deferred.promise;

    }

    // FIELDS APIS


    function createField(formId, field) {
        var form = findById(formId);

        var deferred = q.defer();
        formModel.update({_id : formId}, {$push:{fields:field}}, function(err, status){
           formModel.findById(formId, function(err, form){
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
        var deferred = q.defer();
        formModel.findById(formId, function (err, form) {
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
        formModel.findById(formId, function(err, form){
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