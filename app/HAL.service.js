(function(){
    'use strict';
    angular.module('app').factory('HALService', HALService);

    HALService.$inject = ['$http'];

    function HALService($http) {
        var url = "http://api.archives-ouvertes.fr/search/";
        var service = {};
        service.search = search;
        return service;

        function search(params) {
            var type = "";
            if(params.labo)
                type = "labStructName_s:"+params.query+")OR(labStructAcronym_s:";
            if(params.univ)
            type = "structName_s:"+params.query+")OR(structAcronym_s:";
                        
            var request = url+"?q=("+type+params.query+")&wt="+params.format;

            if(params.coaut)
                request = request.concat("&fl=authFullName_s");

                
            return  $http.get(request)
            .then(handleSuccess, handleError);
        }
    }

    function handleSuccess(res){
        return res.data.response.docs;
    }

    function handleError(error){
        return { success: false, message: error };
    }

})();
 
 
 