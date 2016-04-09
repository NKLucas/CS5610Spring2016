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

        FormService
            .findAllFormsForUser($scope.currentUser._id)
            .then(function(forms){
            $scope.forms = forms;
        });

        function addForm(form){
            var user = UserService.getCurrentUser();
            FormService
                .createFormForUser(user._id, form)
                .then(function(newForm){
                    console.log(newForm, "From controller");
                    $scope.forms.push(newForm);
                });
        }

        function updateForm(form){
            FormService
                .updateFormById($scope.currentForm._id, form)
                .then(function(){
                    FormService
                        .findAllFormsForUser($scope.currentUser._id)
                        .then(function(forms){
                            $scope.forms = forms;

                        });
                });
        }

        function deleteForm(index){
            FormService
                .deleteFormById($scope.forms[index]._id)
                .then(function(){
                    FormService
                        .findAllFormsForUser($scope.currentUser._id)
                        .then(function(forms){
                            $scope.forms = forms;
                        })
                })
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