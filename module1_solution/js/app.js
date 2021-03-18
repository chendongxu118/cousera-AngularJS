(
  function(){
    'use strict'
    angular.module('myFirstApp',[])
    .controller ('myFirstController', MsgController)
    MsgController.$inject = ['$scope'];
    function MsgController($scope){
      $scope.allFood = ""
      $scope.checkResulat = ""
      $scope.message = function(){
        return $scope.checkResulat
      }
      $scope.checkFood = function(){
        var eachFood= $scope.allFood.split(',')
        //console.log (eachFood)
        //console.log ("string" + eachFood.length)
        if (eachFood.length <= 3){
          $scope.checkResulat ="enjoy!"
        }else {
          $scope.checkResulat ="Too Much!"
        }
      }
    }
  }
)();
