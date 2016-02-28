/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($scope, $location, $rootscope){
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
            setSelectedFormIndex: setSelectedFormIndex
        }
        return services;

        function  createFormForUser(userId, form){

        }

        function findAllFormsForUser(userId){

        }

        function deleteFormById(formId){

        }

        function updateFormById(formId, newForm){

        }

        function setSelectedFormIndex(index){

        }

    }
})();