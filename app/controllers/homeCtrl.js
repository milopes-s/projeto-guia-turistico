'use strict';
var guia = angular.module("guia");

guia.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'authService'];

function homeCtrl($scope, authService) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      email: '',
      password: ''
   }
   //Botão Sair 
   vm.logout = function () {
      auth.logout()
   }
}
