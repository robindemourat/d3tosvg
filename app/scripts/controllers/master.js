'use strict';

/**
 * @ngdoc function
 * @name visEngineApp.controller:MasterCtrl
 * @description
 * # MasterCtrl
 * Controller of the visEngineApp
 */

angular.module('visEngineApp')
  .controller('MasterCtrl', function ($scope, $http, $rootScope, DirectoryParser, localStorageService) {

    $rootScope.$on('$routeChangeSuccess', function(e, r){
      $scope.currentPage = r.$$route.originalPath.substr(1);
    });

    $scope.$watch('directory', function(d){
      if(d){
        localStorageService.set('directory', d);
      }
    })

    var initScopeVariables = function(){
      $scope.directoryUrl = '/data/summary.json';
    }

    var initFunctions = function(){
      $scope.getDirectory($scope.directoryUrl);

      var dir = localStorageService.get('directory');
      if(dir){
        $scope.directory = dir;
      }
    }


    $scope.getDirectory = function(url, callback){
      $http
        .get($scope.directoryUrl)
        .success(function(directory){
          DirectoryParser.process(directory, function(d, err){
            if(d){
              $scope.directory = d;
            }else{
              console.log(err);
            }

          });
        })
        .error(function(err){
          console.error('error while parsing directory : ', e);
        });
    }

    $scope.toggleProp = function(obj, prop){
      obj[prop] = !obj[prop];
      setTimeout(function(){
        $scope.$apply();
      })
    }


    initScopeVariables();
    initFunctions();


  });
