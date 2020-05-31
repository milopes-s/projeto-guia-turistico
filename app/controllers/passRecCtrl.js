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
         alert("Foi enviado um E-mail para " + user.email)
      }).catch(function () {
         alert('Ops algo estranho aconteceu, verifique o email e tente novamente!')
      })
   }

}
