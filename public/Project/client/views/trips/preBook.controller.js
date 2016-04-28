
(function(){
    "use strict";
    angular
        .module("TravelWithMe")
        .controller("PreBookController", PreBookController);

    function PreBookController ($scope, $location, $rootScope, UserService){
        $scope.find = find;
        $scope.selecteUser = selecteUser;


        function selecteUser(user){
            console.log("selectUser called", user);
            $rootScope.guide = user.username;
            $location.url("/newtrip")
        }

        function find(des){
            if(des == null){
                alert("Please fill in the fields");
                return
            }
            if(des.city == null){
                alert("Please fill in the City");
                return
            }
            if(des.state == null){
                alert("Please fill in the State");
                return
            }

            $rootScope.tripCity = des.city;
            $rootScope.tripState = des.state;

            UserService
                .findAllUsers()
                .then(function(users){
                    var guides = [];
                    for(var i in users){
                        if(users[i].roles.indexOf("guide") >= 0 && users[i].city == des.city && users[i].state == des.state){
                            guides.push(users[i]);
                        }
                    }
                    if(guides.length != 0){
                        $scope.users = guides;
                    } else {
                        alert("Can not find any user in the destination city!");
                        return
                    }

                })

        }
    }
})();