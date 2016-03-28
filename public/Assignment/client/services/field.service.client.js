/**
 * Created by Zhiyu on 3/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q, $rootScope){

        var services =
        {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        }
        return services;

        function createFieldForForm(formId, field){
            var deferred = $q.defer();
            $http
                .post("/api/assignment/form/" + formId + "/field" , field)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }


        function getFieldForForm(formId, fieldId){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/form/" + formId + "/field" + fieldId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function deleteFieldFromForm(formId, fieldId){
            var deferred = $q.defer();
            $http
                .delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }
    }
})();