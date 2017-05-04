(function(){
    'use strict';
    var controller = '';
     angular
           .module('falcony')
           .directive('namecheck', namecheck)
           .directive('passcheck', passcheck)
           .controller('Login.IndexController', Controller);

          function Controller($location, $scope, $http, $localStorage, AuthenticationService){
                var fal = controller = this;
                fal.login = login;
                console.log("Current user : " + $localStorage.currentUser);

                function login(){
                           fal.loading = true;
                           AuthenticationService.Login(fal.username, fal.password)
                                .then(function success(response){
                                            if (response.status == 200){
                                                console.log('success.........')
                                                var token =  angular.fromJson(response.data).data.token;

                                                if(token === null){
                                                    fal.error = 'user not authorized...';
                                                } else{
                                                        $localStorage.currentUser = {'username': fal.username, 'token': angular.fromJson(response.data).data.token }
                                                       //show home page
                                                       $location.path('/');
                                         }
                                }
                           }, function error(response){
                                console.log("error: " + angular.toJson(response.data));
                                //set login error
                                fal.error = "Error during login in. Please check the username and password....";
                           });
                           fal.loading = false;
                }
                function logout(){
                           fal.loading = true;

                           AuthenticationService.Logout(function(response){
                                if (response == true){
                                    // set login page
                                    $location.path('/login');
                                    console.log("user logged out successfully...");
                                }
                           });
                           fal.loading = false;
                }
          }

          function namecheck(){
            return{
                require: 'ngModel',
                link: function(scope, element, attr, ngModel){
                        ngModel.$parsers.push(function(name){
                            if (name.length < 5)
                                   ngModel.$setValidity('short', false);
                            else
                                    ngModel.$setValidity('short', true);
                            return name;
                        });
                    }};
          }

          function passcheck(){
            return{
                require: 'ngModel',
                link: function(scope, element, attr, ngModel){
                        ngModel.$parsers.push(function(password){
                                if (password.length < 8){
                                        ngModel.$setValidity('short', false);
                                 }else{
                                        ngModel.$setValidity('short', true);
                                }
                                 ngModel.$setValidity('digit', /^[0-9]+$/.test(password));
                             return password
                        });
                    }
                };}
})();