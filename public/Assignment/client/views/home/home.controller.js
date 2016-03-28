/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HomeController", function($scope, $routeParams, $location, UserServices){
            var users = UserServices.findAllUsers();
        });
})();