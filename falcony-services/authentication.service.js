(function(){
    'use strict';
    angular
        .module('falcony')
        .factory('AuthenticationService', Service);

        function Service($http, $localStorage){
                    var service = {};
                    service.Login = Login;
                    service.Logout = Logout;
                    return service;

                    function Login(username, password){

                        var config = { headers: {'Content-type': 'text/plain' }}
                        return $http.post('http://127.0.0.1:8000/login', {"username" : username, "password": password}, config);
                    }
                    function Logout(callback){
                            //clear auth header
                             delete $http.defaults.headers.common.Authorization;
                            //delete user from storage
                             delete $localStorage.currentUser;
                             console.log('logged out successfully.....,,,,');
                          callback(true)
                    }
        }
})();