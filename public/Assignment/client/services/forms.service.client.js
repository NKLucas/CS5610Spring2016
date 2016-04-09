/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q, $rootScope){

        var services =
        {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }
        return services;

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            $http
                .post("/api/assignment/user/" + userId + "/form", form)
                .success(function(res){

                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http
                .get("/api/assignment/user/" + userId + "/form")
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            console.log(formId, "FROM CLient Service");
            $http
                .delete("/api/assignment/form/" + formId)
                .success(function(res){
                    deferred.resolve(res);
                });
            return deferred.promise;

        }

        function updateFormById(formId, form) {
            var deferred = $q.defer();
            $http
                .put("/api/assignment/form/" + formId, form)
                .success(function (res) {
                    deferred.resolve(res);
                });
            return deferred.promise;
        }
    }
})();