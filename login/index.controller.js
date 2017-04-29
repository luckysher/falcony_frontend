(function(){
    'use strict';
    var controller = '';
     angular
           .module('falcony')
           .directive('namecheck', namecheck)
           .directive('passcheck', passcheck)
           .controller('Login.IndexController', Controller);

          function Controller($location, $scope, $window){
                var fal = controller = this;
                fal.login = login;

                console.log("Current user : " + $window.currentUser);

                function login(){
                           fal.loading = true;
                           console.log('Username : ' + fal.username + 'Password : ' + fal.password);
                           fal.loading = false;
                           fal.error = "Error during login....";
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
                    }
                };
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
                };
          }
})();