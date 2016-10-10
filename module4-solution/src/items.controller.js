(function() {
  'use strict';

  angular.module('Data')
    .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['items'];

  function MenuItemsController(items) {
    var categoryDetail = this;
    categoryDetail.menuItems = items.data.menu_items;
    categoryDetail.name = items.data.category.name;
  };

})();
