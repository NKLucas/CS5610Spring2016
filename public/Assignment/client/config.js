/**
 * Created by Zhiyu on 2/27/16.
 */
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .config(config)

    function config($routeProvider){
        $routeProvider
            .when("/register",
                {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
            .when("/login",
                {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
            .when("/profile",
                {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html"
                })
            .when("/home",
                {
                    templateUrl: "views/home/home.view.html"

                })
            .when("/forms",
                {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
            .when("/form/:formId/:title/fields",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo:"/home"
            });

    }
})();