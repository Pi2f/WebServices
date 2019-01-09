(function () {
  angular
    .module('app', [])
    .config(config)
    .run(run)
    .controller('AppController', AppController);

  function config() {

  }

  function run() {}

  function AppController(HALService) {
    var vm = this;
    vm.search = search;
    vm.filter = filter;
    vm.params = {
      labo: false,
      univ: false,
      coaut: false,
      query: "",
    }
    vm.results = [];
    vm.authors = [];

    function filter(cluster){
      vm.results = [];
      vm.clusters = [];
      HALService.filter(cluster.docs).then(function(res){
        console.log(res);
        vm.results = res.response.docs;
        vm.clusters = res.clusters;
      });
    }

    function search() {
      vm.results = [];
      vm.clusters = [];
      vm.authors = [];
      vm.selected = "Documents";
      vm.params.query = vm.textsearch;
      vm.params.format = "json";
      
      HALService.search(vm.params).then(function (res) {        
        vm.clusters = res.clusters;
        if (vm.params.coaut) {                    
          getCoaut(res.response.docs);
        } else {
          vm.results = res.response.docs;
        }
        vm.params = {
          labo: false,
          univ: false,
          coaut: false,
          query: "",
        }
      });      

      function getCoaut(data) {
        data.forEach(document => {
          // document.authFullName_s.forEach(author => {
            document.authors.forEach(author => {
            author = author.includes(vm.textsearch) ? null : author;
            if (author != null) {
              if (!vm.authors.includes(author)) {
                vm.authors.push(author);
              }
            }
          });
        })
      }
    }
  }
})();