'use strict';

describe('Directive: visLinechart', function () {

  // load the directive's module
  beforeEach(module('visEngineApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vis-linechart></vis-linechart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the visLinechart directive');
  }));
});
