'use strict';

describe('Service: DirectoryParser', function () {

  // load the service's module
  beforeEach(module('visEngineApp'));

  // instantiate service
  var DirectoryParser;
  beforeEach(inject(function (_DirectoryParser_) {
    DirectoryParser = _DirectoryParser_;
  }));

  it('should do something', function () {
    expect(!!DirectoryParser).toBe(true);
  });

});
