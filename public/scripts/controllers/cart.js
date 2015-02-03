define(['angular'], function (angular) {
	'use strict';

	/**
	 * @ngdoc function
	 * @name carter.controller:CartCtrl
	 * @description
	 * # CartCtrl
	 * Controller of the carter
	 */
	angular.module('carter.controllers.CartCtrl', [])
		.controller('CartCtrl', function ($scope, $rootScope, AuthEvents, $http, Session, Cart, Customer, $mdDialog) {
			$scope.cart = Cart;
			$scope.auth = {
				email: '',
				password: ''
			};

			var token = Session.getToken();
			if (token !== ''){
				$http({
					method:'GET',
					url:'http://goapi.curtmfg.com/shopify/account',
					responseType: 'jsonp',
					headers:{
						'Authorization':'Bearer '+token
					},
					params:{
						'shop':'54b963688ff6c70001000001'
					},
				}).success(function(data){
					$scope.customer = data;
				}).error(function(data){
					console.log(data);
				});
				
			}

			$scope.generatePartImage = function(part){
				if(part.images === undefined){
					return '://';
				}

				var img = {};
				for (var i = 0; i < part.images.length; i++) {
					img = part.images[i];
					if(img.size.toLowerCase() === 'medio' && img.sort === 'a'){
						return img.path.Scheme +'://'+img.path.Host+img.path.Path;
					}
				}
				for (i = 0; i < part.images.length; i++) {
					img = part.images[i];
					if(img.size.toLowerCase() === 'medio'){
						return img.path.Scheme +'://'+img.path.Host+img.path.Path;
					}
				}
				for (i = 0; i < part.images.length; i++) {
					img = part.images[i];
					if(img.sort === 'a'){
						return img.path.Scheme +'://'+img.path.Host+img.path.Path;
					}
				}

				if(part.images[0] !== undefined){
					img = part.images[0];
					return img.path.Scheme +'://'+img.path.Host+img.path.Path;
				}
			};
			$scope.removeItem = function(item){
				var confirm = $mdDialog.confirm()
																.title('Remove '+item.name+'?')
																.ariaLabel('Remove Item')
																.ok('Yes')
																.cancel('Cancel');
				$mdDialog.show(confirm).then(function() {
					Cart.removeItem(item);
				});
			};
			$scope.updateQuantity = function(item){
				if(item.quantity === 0){
					$scope.removeItem(item);
					return;
				}
			};
			$scope.login = function(){
				Customer.login({'shop':'54b963688ff6c70001000001'},$scope.auth).$promise.then(function(data){
					$rootScope.$broadcast(AuthEvents.loginSuccess);
					Session.storeToken(data.token);
					$scope.customer = data;
				},function(){
					$rootScope.$broadcast(AuthEvents.loginFailed);
				});
			};
		});
});
