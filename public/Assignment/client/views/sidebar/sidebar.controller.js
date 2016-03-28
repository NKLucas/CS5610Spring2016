/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, UserService, $routeParams){
        var users = UserService.findAllUsers();
    };
})();