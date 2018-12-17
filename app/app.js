(function(){
  angular
  .module('app', [])
  .config(config)
  .run(run)
  .controller('AppController', AppController);

  function config() {
  
  }

  function run(){
  }
  
  function AppController(HALService){
    var vm = this;
    vm.search = search;
    vm.params = {
      labo: false,
      univ: false,
      coaut: false,
      query: "",
    }
    vm.results = [];
    
    function search(){
      vm.params.query = vm.textsearch;
      vm.params.format = "json";
        
        console.log(vm.params);
        HALService.search(vm.params).then(function(res){
          vm.results = res;
        });
    }
  }
})();
