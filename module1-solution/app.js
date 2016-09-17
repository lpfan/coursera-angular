(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.lunchMenu = "";
    $scope.informMessage = "";
    $scope.informState = "";
    var lunchMenuItems = [];

    $scope.checkMenuItems = function () {
        if (!$scope.lunchMenu) {
          $scope.informMessage = 'Please enter data first';
          $scope.informState = 'red';
          return;
        }

        lunchMenuItems = $scope.lunchMenu.split(',');

        if (lunchMenuItems.length <= 3) {
          $scope.informMessage = 'Enjoy!';
          $scope.informState = 'green';
        } else {
          $scope.informMessage = 'Too much!';
          $scope.informState = 'red';
        }

    };
  }
})();
