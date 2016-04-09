/**
 * Created by Zhiyu on 3/27/16.
 */
module.exports = function(app, formModel){
    app.get("/api/assignment/form/:formId/field", getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);


    function getFormFields(req, res){
        var formId = req.params.formId;
        //var fields = formModel.findAllFields(formId);
        //res.json(fields);
        formModel
            .findAllFields(formId)
            .then(function(fields){
                res.json(fields);
            });
    }

    function getField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //var field = formModel.findField(formId, fieldId);
        //res.json(field);
        formModel
            .findField(formId, fieldId)
            .then(function(field){
                res.json(field);
            });
    }

    function createField(req, res){
        var formId = req.params.formId;
        var field = req.body;
        //var newField = formModel.createField(formId, field);
        //res.json(newField);
        formModel
            .createField(formId, field)
            .then(function(newField){
                res.json(newField);
            });
    }

    function updateField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        console.log("update server side is called");
        //var new_field = formModel.updateField(formId, fieldId, field);
        //res.json(new_field);
        formModel
            .updateField(formId, fieldId, field)
            .then(function(new_filed){
                res.json(new_filed);
            });
    }

    function deleteField(req, res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //var fields = formModel.removeField(formId, fieldId);
        //res.json(fields);
        formModel
            .removeField(formId, fieldId)
            .then(function(fields){
                res.json(fields);
            });
    }
};

