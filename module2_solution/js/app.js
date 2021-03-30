(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AddItemConstroller', AddItemConstroller)
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListService', ShoppingListServiceProvider)
.config(Config)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
  // Save Yaakov from himself
  ShoppingListServiceProvider.defaults.maxItems = 5;
}

//ToBuyController.$inject = ['$scope'];
AddItemConstroller.$inject = ['ShoppingListService']
function AddItemConstroller(ShoppingListFactory){
  var itemAdder = this;
  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";
  itemAdder.addItem = function (){
    try{
      ShoppingListFactory.addItem (itemAdder.itemName,itemAdder.itemQuantity)
    }catch(error){
      itemAdder.errorMessage = error.message;
      console.log (error.message)
    }
  }
  //itemAdder.items = itemAdder.ShoppingList.getItem();

}
ToBuyController.$inject = ['ShoppingListService', 'ShoppingListCheckOffService']
function ToBuyController(ShoppingListService,ShoppingListCheckOffService){
  var toBuy = this;
  toBuy.items = ShoppingListService.getItem();
  toBuy.removeItem = function (itemIndex){
    ShoppingListService.removeItem(itemIndex);
  }
  toBuy.boughtItem = function (itemIndex){
    var willBuyItem = toBuy.items[itemIndex];
    ShoppingListCheckOffService.addItem(willBuyItem);
    ShoppingListService.removeItem(itemIndex);
  }

}//end of ToBuyController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService){
  //control alreadyBought list
  var alreadyBought = this;
  alreadyBought.items = ShoppingListCheckOffService.getItem();

}//end of AlreadyBoughtController

function ShoppingListProvider(){

}//end of ShoppingListProvider
function ShoppingListCheckOffService(){

}//end of ShoppingListCheckOffService

function ShoppingListService(maxItems){
  var service = this
  var items = [
      {
        name: "Milk",
        quantity: "2"
      }
    ]

  service.addItem = function (itemName, itemQuantity){
    if ((maxItems === undefined) ||
    (maxItems !== undefined) && (items.length < maxItems)){
      var newItem = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(newItem);
    }
    else{
      throw new Error( "MaxItems (" + maxItems + ") reached !");
    }
  };
  service.getItem = function (){
    return items;
  }
  service.removeItem = function(itemIndex){
    items.splice(itemIndex,1);
  }

}//end of ShoppingListService

function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}////end of ShoppingListServiceProvider

function ShoppingListCheckOffService(){
  var service =this;
  var items =[];
  service.addItem = function (item){
    items.push(item)
  }
  service.getItem = function (){
    return items;
  }
}

})();
