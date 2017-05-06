(function(){
    'use strict';
    angular
         .module('falcony')
         .controller('Home.IndexController', Controller);

          function Controller($location, $scope, $localStorage, AuthenticationService, ProductService){

                console.log("Current user>> : home " + JSON.stringify($localStorage.currentUser));
                $scope.username = $localStorage.currentUser.username;
                  $scope.isEmpty = function(obj) {
                        return angular.equals(obj,{});
                  };

                //get all products
                ProductService.Products(function(jsondata){
                        console.log("Product list: " + angular.toJson(jsondata));
                        var data = JSON.stringify(jsondata.data)
                        $scope.products = angular.fromJson(jsondata.data);
                    });

                $scope.logout =  function logout(){
                        AuthenticationService.Logout(function success(response){
                            if (response == true)
                                $location.path('/login');
                        });
                }
          }
})();