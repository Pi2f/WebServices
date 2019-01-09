(function(){
    'use strict';
    angular.module('app').factory('HALService', HALService);

    HALService.$inject = ['$http'];

    function HALService($http) {
        var url = "http://localhost:3001";
        var service = {};
        service.search = search;
        service.filter = filter;
        return service;

        function search(params) {            
            // var type = "";
            if(params.labo == "labo"){
                return  $http.get(url+"/laboratory/"+params.query)
                .then(handleSuccess, handleError);
            }

            // type = "labStructName_s:"+params.query+")OR(labStructAcronym_s:";
            if(params.univ == "univ"){
                return  $http.get(url+"/university/"+params.query)
                .then(handleSuccess, handleError);
            }

            // type = "structName_s:"+params.query+")OR(structAcronym_s:";        
            // var request = url+"?q=("+type+params.query+")&wt="+params.format;

            if(params.coaut == "coaut")
                return  $http.get(url+"/author/"+params.query)
                .then(handleSuccess, handleError);     
                
            return  $http.get(url+"/"+params.query)
                .then(handleSuccess, handleError);                 
        }

        function filter(docs){
            return  $http.post(url+"/filter",docs)
                .then(handleSuccess, handleError);
        }
    }

    function handleSuccess(res){
        return res.data;
    }

    function handleError(error){
        return { success: false, message: error };
    }

})();
 
 
 