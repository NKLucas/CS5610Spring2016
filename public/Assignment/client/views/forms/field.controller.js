/**
 * Created by Zhiyu on 2/27/16.
 */
(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $rootScope, FieldService, $routeParams) {
        var model = this;
        var formId = $routeParams.formId;
        var title = $routeParams.title;

        model.addField = addField;
        model.deleteField = deleteField;
        model.editField = editField;
        model.title = title;




        FieldService
            .getFieldsForForm(formId)
            .then(function (fields) {
                model.fields = fields;
            });

        function editField(){

        }

        function addField(fieldType){
            var field = null;
            switch(fieldType) {
                case "SINGLELINE" :
                    field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                    break;
                case "MULTILINE" :
                    field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                    break;
                case "DATE" :
                    field = {"_id": null, "label": "New Date Field", "type": "DATE"};
                    break;
                case "DROPDOWN" :
                    field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]};
                    break;
                case "CHECKBOX" :
                    field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]};
                    break;
                case "RADIO" :
                    field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]};
                    break;
                default : return;
            }
            FieldService
                .createFieldForForm(formId, field)
                .then(function(fields){
                    $scope.model.fields = fields;
                });
        }

        function deleteField(fieldId){
            FieldService
                .deleteFieldFromForm(formId, fieldId)
                .then(function(fields){
                   model.fields = fields;
                });
        }


    }
})();