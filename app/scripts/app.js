'use strict';

/**
 * @ngdoc overview
 * @name visEngineApp
 * @description
 * # visEngineApp
 *
 * Main module of the application.
 */
angular
  .module('visEngineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hc.downloader',
    'ui.bootstrap',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/sources', {
        templateUrl: 'views/sources.html',
        controller: 'SourcesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });


  })
  .run(function($rootScope, $location) {
    $rootScope.location = $location;
});;
