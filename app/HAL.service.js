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
            var filter = "";
            if(params.labo)
                filter="labStructName_t"
            if(params.univ)
                filter = "structName_s"
            

            return  $http.get(url+"?q="+filter+":"+params.query+"&wt="+params.format)
            .then(handleSuccess, handleError);    
        }
    }

    function handleSuccess(res){
        console.log(res);
        return res.data.response.docs;
    }

    function handleError(error){
        return { success: false, message: error };
    }

})();
 
 
 