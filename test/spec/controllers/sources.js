'use strict';

describe('Controller: SourcesCtrl', function () {

  // load the controller's module
  beforeEach(module('visEngineApp'));

  var SourcesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SourcesCtrl = $controller('SourcesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
