(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItemsDirective)
    .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

  function foundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: MenuItemsListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function MenuItemsListDirectiveController () {
    var list = this;

    list.emptyResult = function () {
      if (list.items.length === 0){
        return true;
      }
    };
  }

  NarrowItDownController.$inject =['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var list = this;

    list.searchItems = function () {
      MenuSearchService.getMatchedMenuItems(list.searchTerm).then(function(result){
          list.found = result;
      });
    };

    list.removeItem = function (itemIndex) {
      list.found.splice(itemIndex, 1);
    };

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService ($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: ApiBasePath
      })
        .then(
          function success (result) {
            var foundItems = [];
            angular.forEach(result.data.menu_items, function (item) {
              if ( item.description.indexOf(searchTerm ) !== -1 ) {
                foundItems.push(item);
              }
            });
            return foundItems;
          }
        );
    };

  }

})();
