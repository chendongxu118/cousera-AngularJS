(
  function(){
    'use strict'
    angular.module('myFirstApp',[])
    .controller ('myFirstController', function($scope){
      $scope.name = "chen"
      $scope.sayhello = function(){
        return "Hello Chen"
      }
    })
  }
)();
