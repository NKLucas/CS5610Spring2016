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
            .when("/home",
                {
                    templateUrl: "views/carousel/carousel.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
                    }

                })
            .when("/newtrip",
                {
                    templateUrl: "views/trips/newTrip.view.html",
                    controller: "NewTripController",
                    resolve: {
                        loggedin: checkCurrentUser
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
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            } else {
                $rootScope.errorMessage = 'You need to log in.';
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
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
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
            $rootScope.errorMessage = null;
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