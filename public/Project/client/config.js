/**
 * Created by Zhiyu on 4/23/16.
 */

(function () {
    "use strict";
    angular
        .module("TravelWithMe")
        .config(config)

    function config($routeProvider){
        $routeProvider
            .when("/preregister",
                {
                    templateUrl: "views/users/preRegister.view.html",
                    controller: "PreRegisterController"
                })
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
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/prebook",
                {
                    templateUrl: "views/trips/preBook.view.html",
                    controller: "PreBookController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/admin",
                {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }

                })

            .when("/alltrips",
                {
                    templateUrl: "views/trips/allTrips.view.html",
                    controller: "AllTripsController",
                    resolve: {
                        loggedin: checkAdmin
                    }

                })
            .when("/guidetrips",
                {
                    templateUrl: "views/trips/guideTrips.view.html",
                    controller: "GuideTripsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
            .when("/mytrips",
                {
                    templateUrl: "views/trips/myTrips.view.html",
                    controller: "MyTripsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }

                })
            .when("/home",
                {
                    templateUrl: "views/carousel/carousel.view.html",

                })
            .when("/newtrip",
                {
                    templateUrl: "views/trips/newTrip.view.html",
                    controller: "NewTripController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
            .when("/form/:formId/:title/fields",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve:{
                    loggedin: checkCurrentUser
                }
            })
            .otherwise({
                redirectTo:"/home"
            });

    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            console.log("check CurrentUser", user);
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();