'use strict';

/**
 * @ngdoc function
 * @name visEngineApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the visEngineApp
 */
angular.module('visEngineApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
