'use strict';
var guia = angular.module("guia");

guia.controller('passRecCtrl', passRecCtrl);

passRecCtrl.$inject = ['$scope', 'authService'];

function passRecCtrl($scope, authService) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      email: ''
   }

   vm.enviaEmail = function () {
      auth.passReset(user).then(function () {
         console.log("Email Enviado")
      }).catch(function () {
         console.log("Se fodeu")
      })
   }

}
