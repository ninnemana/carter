/*jshint unused: vars */
define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
	'use strict';

	describe('Directive: integerSelect', function () {

		// load the directive's module
		beforeEach(module('carter.directives.IntegerSelect'));

		var scope;

		beforeEach(inject(function ($rootScope) {
			scope = $rootScope.$new();
		}));
	});
});
