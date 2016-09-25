(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService', '$scope'];
  function ToBuyShoppingController (ShoppingListCheckOffService, $scope) {
    var cntrl = this;
    cntrl.buyItems = ShoppingListCheckOffService.getBuyItems();

    cntrl.buyItemHandler = function (itemIndex) {
      ShoppingListCheckOffService.addItemToBoughtList(itemIndex);
    };
  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController (ShoppingListCheckOffService) {
    var cntrl = this;

    cntrl.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService () {
    var buyItems = [
          { name: "cookies", quantity: 10},
          { name: "sugar drinks", quantity: 2},
          { name: "chips", quantity: 3},
          { name: "roasted beaf", quantity: 2},
          { name: "tea", quantity: 1}
        ],
        boughtItems = [],
        service = this;

    service.getBuyItems = function () {
      return buyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.addItemToBoughtList = function(itemIndex) {
      var item = buyItems.splice(itemIndex, 1);
      boughtItems.push(item[0]);
    };
  }
})();
