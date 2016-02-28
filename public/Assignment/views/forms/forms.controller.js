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
        var forms = FormService.findAllFormsForUser($scope.currentUser._id);
        $scope.forms = forms;

        function addForm(form){
            var user = UserService.getCurrentUser();
            var form = FormService.createFormForUser(user._id, form);
            $scope.forms.push(form);
        }

        function updateForm(form){
            FormService.updateFormById($scope.currentForm._id, form);
            $scope.forms = FormService.findAllFormsForUser($scope.currentUser._id);
        }

        function deleteForm(index){
            FormService.deleteFormById(index);
            $scope.forms = FormService.findAllFormsForUser($scope.currentUser._id);
        }

        function selectForm(index, form){
            $scope.selectedFormIndex = index;
            $scope.currentForm = {
                _id:form._id,
                title:form.title
            }
        }
    }
})();