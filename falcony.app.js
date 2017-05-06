(function(){
    'use strict';
        angular
            .module('falcony', ['ui.router', 'ngMessages', 'ngStorage'])
            .config(config)
            .run(run);

          function config($stateProvider, $httpProvider, $urlRouterProvider){
            $httpProvider.defaults.useXDomain = true;
             delete $httpProvider.defaults.headers.common['X-Requested-With'];


            // setting default route
            $urlRouterProvider.otherwise('/');

            // mapping for different routes
            $stateProvider
                        .state('home', {
                            url: '/',
                            templateUrl: 'home/index.view.html',
                            controller: 'Home.IndexController',
                            controllerAs: 'fal'
                        })
                        .state('login', {
                            url: '/login',
                            templateUrl: 'login/index.view.html',
                            controller: 'Login.IndexController',
                            controllerAs: 'fal'
                        });
          }

          function run($http, $rootScope, $location, $localStorage){
                console.log("Current user>> : index " + JSON.stringify($localStorage.currentUser));
                if ($localStorage.currentUser){
                    $http.defaults.headers.common['Authorization'] = $localStorage.currentUser.username + ':' + $localStorage.currentUser.token;
                    // do not show the login page again
                    $location.path('/');
                }
                $rootScope.$on('$locationChangeStart', function(event, next, current){
                    var restricted_pages = ['/login']
                    var restricted = restricted_pages.indexOf($location.path()) === -1;
                    if (!$localStorage.currentUser && restricted){
                        $location.path('/login');
                    }
                });
          }
})();
