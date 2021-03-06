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
            console.log(user._id, $scope.currentUser);
            UserService
                .updateUser(user._id, $scope.currentUser)
                .then(function(newUsers){
                    if (newUsers) {
                        $scope.message = "User updated successfully";
                        for (var i in newUsers){
                            if (newUsers[i]._id == user._id){
                                console.log("equal", newUsers[i]);
                                UserService.setCurrentUser(newUsers[i]);
                            }
                        }

                    } else {
                        $scope.error = "Unable to update the user";
                    }
                })
        }
    }
})();