(function() {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.lunchMenu = '';
    $scope.informMessage = '';
    $scope.informState = '';
    var lunchMenuItems = [];

    $scope.checkMenuItems = function () {
        if (!$scope.lunchMenu) {
          $scope.informMessage = 'Please enter data first';
          $scope.informState = 'red';
          return;
        }

        $scope.informState = 'green';
        lunchMenuItems = $scope.lunchMenu.split(',');

        if (lunchMenuItems.length <= 3) {
          $scope.informMessage = 'Enjoy!';
        } else {
          $scope.informMessage = 'Too much!';
        }

    };
  }
})();
