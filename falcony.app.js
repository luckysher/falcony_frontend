(function(){
    'use strict';

        angular
            .module('falcony', ['ui.router', 'ngMessages'])
            .config(config)
            .run(run);

          function config($stateProvider, $httpProvider, $urlRouterProvider){
             console.log('config log......');
             // set headers value
             $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
             $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
             $httpProvider.defaults.headers.useXDomain = true;
             $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
             $httpProvider.defaults.headers.common['Accept'] = 'application/json';

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

          function run($location, $window){
                console.log("Running angular...");
                $location.path('/login');
                $window.currentUser = 'Lucky';
                //console.log($localStorage);
          }
})();
