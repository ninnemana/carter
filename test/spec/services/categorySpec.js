/*jshint unused: vars */
define(['angular', 'angular-mocks', 'angular-resource', 'app'], function(angular, mocks, resource, app) {
  'use strict';

  describe('Service: Category', function () {

    // load the service's module
    beforeEach(module('carter.services.Category'));

    // instantiate service
    var Category;
    beforeEach(inject(function (_Category_) {
      Category = _Category_;
    }));


  });
});
