/**
 * Created by Zhiyu on 3/26/16.
 */
var forms = require("./form.mock.json");
var guid = require('guid');
module.exports = function(app){
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

    function create(userId, form){
        var new_form = {
            _id: guid.create(),
            title : form.title,
            userId : userId,
            fields: form.fields
        };
        forms.push(new_form);
        return new_form;
    }

    function findAll(userId){
        var userForms = [];
        for (var f in forms){
            if (forms[f].userId == userId){
                userForms.push(forms[f]);
            }
        }
        return userForms;
    }

    function findById(id){
        for (var f in forms){
            if (forms[f]._id == id){
                return forms[f];
            }
        }
        return null;
    }

    function update(id, new_form){
        for (var f in forms){
            if (forms[f]._id == id){
                forms[f].title = new_form.title;
                forms[f].fields = new_form.fields;
                return forms[f];
            }
        }
        return null;
    }

    function remove(id){
        for (var i = 0; i < forms.length; i++){
            if (forms[i]._id == id){
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    function findFormByTitle(title){
        for (var f in forms){
            if (forms[f].title == title){
                return forms[f];
            }
        }
        return null;
    }

    // FIELDS APIS


    function createField(formId, field) {
        var form = findById(formId);
        //var newField = {
        //    _id : Guid.create(),
        //    label : field.label,
        //    type : field.type,
        //    placeholder : field.placeholder,
        //    options : field.options
        //};
        var newField = {
            _id : guid.create(),
            label : field.label,
            type : field.type,
            placeholder : field.placeholder,
            options : field.options
        };
        if (form.fields != null){
            form.fields.push(newField);
        }else{
            form.fields = [newField];
        }
        return form.fields;
    }

    function findAllFields(formId) {
        var form = findById(formId);
        var fields = [];
        if(form != null) {
            fields = form.fields;
        }
        return fields;
    }

    function findField(formId, fieldId) {
        var form = findById(formId);
        if(form != null) {
            var fields = form.fields;
            for(var i in fields) {
                if(fields[i]._id == fieldId) {
                    return fields[i];
                }
            }
        }
        return null;
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
        var form = findById(formId);
        for(var i = 0; i < form.fields.length; i++) {
            if(form.fields[i]._id == fieldId) {
                form.fields.splice(i, 1);
            }
        }
        return form.fields;
    }
};