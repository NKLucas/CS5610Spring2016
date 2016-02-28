/**
 * Created by Zhiyu on 2/27/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, UserService, $location){
        $scope.error = null;
        $scope.message = null;
        $scope.update = updateUser;

        $scope.currentUser = UserService.getCurrentUser();
        if (!$scope.currentUser) {
            $location.url("/home");
        }



        function updateUser (user) {

            $scope.error = null;
            $scope.message = null;

            var newUser = UserService.updateUser(user._id, $scope.currentUser);

            if (newUser) {
                $scope.message = "User updated successfully";
                UserService.setCurrentUser(newUser);
            } else {
                $scope.message = "Unable to update the user";
            }
        }

    }
})();