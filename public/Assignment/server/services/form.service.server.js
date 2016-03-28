/**
 * Created by Zhiyu on 3/27/16.
 */
module.exports = function(app, formModel){
    app.get("/api/assignment/user/:userId/form", getFormForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", deleteForm);


    function getFormForUser(req, res){
        var userId = req.params.userId;
        var forms = formModel.findAll(userId);
        res.json(forms);
        //
        //formModel
        //    .findAll(userId)
        //    .then(function(forms){
        //        res.json(forms);
        //    });
    }

    function getFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findById(formId);
        res.json(form);
        //formModel
        //    .findById(formId)
        //    .then(function(form){
        //        res.json(form);
        //    });
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body;
        var forms = formModel.create(userId, form);
        res.json(forms);
        //formModel
        //    .create(userId, form)
        //    .then(function(forms){
        //        res.json(forms);
        //    });
    }

    function updateForm(req, res){
        var formId = req.params.formId;
        var form = req.body;
        var new_form = formModel.update(formId, form);
        res.json(new_form);
        //formModel
        //    .update(formId, form)
        //    .then(function(new_form){
        //        res.json(new_form);
        //    });
    }

    function deleteForm(req, res){
        var formId = req.params.formId;
        var forms = formModel.remove(formId);
        res.json(forms);
        //formModel
        //    .remove(formId)
        //    .then(function(forms){
        //        res.json(forms);
        //    });
    }
};
