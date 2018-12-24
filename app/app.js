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
    vm.params = {
      labo: false,
      univ: false,
      coaut: false,
      query: "",
    }
    vm.results = [];
    vm.authors = [];

    function search() {
      vm.results = [];
      vm.authors = [];
      vm.selected = "Documents";
      vm.params.query = vm.textsearch;
      vm.params.format = "json";
      
      HALService.search(vm.params).then(function (res) {
        if (vm.params.coaut) {
          getCoaut(res);
        } else {
          vm.results = res;
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
          document.authFullName_s.forEach(author => {
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