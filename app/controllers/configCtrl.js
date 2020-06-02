'use strict';
var guia = angular.module("guia");

guia.controller('configCtrl', configCtrl);

configCtrl.$inject = ['$scope', 'authService', '$location'];

function configCtrl($scope, authService, $location) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      email: '',
      password: ''
   }

   vm.test = function () {
      alert(auth.dataAll())
   }

}