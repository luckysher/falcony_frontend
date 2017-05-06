(function(){
    'use strict';
    angular
        .module('falcony')
        .factory('ProductService', ProductService);

        function ProductService($http, $localStorage){
          var service = {}
          service.Products = getProducts;
          return service;

            // get the available products details
            function getProducts(callback){
                  var Headers = {
                        'Accept' : 'application/json'
                  }
                  $http.get('http://127.0.0.1:8000/products', { headers : Headers }).then(function success(response){
                                callback(response.data);
                        },function error(response){ console.log("no products")});
            }
        }
})();