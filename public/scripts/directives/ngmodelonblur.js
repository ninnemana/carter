define(['angular'], function (angular) {
	'use strict';

	/**
   * @ngdoc directive
   * @name carter.directive:ngModelOnblur
   * @description
   * # ngModelOnblur
   */
  angular.module('carter.directives.NgModelOnblur', [])
		.directive('ngModelOnblur', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				priority: 1, // needed for angular 1.2.x
				link: function(scope, elm, attr, ngModelCtrl) {
					if (attr.type === 'radio' || attr.type === 'checkbox') {
						return;
					}

					elm.unbind('input').unbind('keydown').unbind('change');
					elm.bind('blur', function() {
						scope.$apply(function() {
							ngModelCtrl.$setViewValue(elm.val());
						});
					});
				}
			};
		});
});
