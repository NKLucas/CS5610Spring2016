/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService, UserService){
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            var user = UserService.getCurrentUser();
            var form = FormService.createFormForUser(user.id, form);
        }

        function updateForm(index){
            var form = FormService.updateFormById(index, $scope.currentForm)
        }

        function deleteForm(index){
            FormService.deleteFormById(index)
        }

        function selectForm(index){
            FormService.setSelectedFormIndex(index)
        }
    }
})();