/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope){
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var services =
        {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }
        return services;

        function createFormForUser(userId, form){
            var createForm = {
                _id:form._id,
                title:form.title,
                userId:userId
            }
            forms.push(createForm);
            return createForm;

        }

        function findAllFormsForUser(userId){
            var userForms = []
            for (var f in forms){
                if (forms[f].userId == userId){
                    userForms.push(forms[f]);
                }
            }
            return userForms;

        }

        function deleteFormById(formId){
            forms.splice(formId,1);
        }

        function updateFormById(formId, newForm){
            if (formId == null){
                return null
            }
            for (var f in forms){
                if (forms[f]._id == formId){
                    forms[f].title= newForm.title;
                }
            }
        }

    }
})();