'use strict';
var guia = angular.module("guia");

guia.controller('configCtrl', configCtrl);

configCtrl.$inject = ['$scope', 'authService', '$timeout'];

function configCtrl($scope, authService, $timeout) {
   var vm = $scope;
   var auth = authService

   var user = $scope.user = {
      name: '',
      email: '',
      password: 'user.password',
      photoUrl: '',
      uid: '',
      emailVerified: ''
   }

   vm.buscaDados = function () {

      $timeout(function () {

         var userLgd = auth.isLoggedIn();


         if (userLgd != null) {
            user.name = userLgd.displayName;
            user.email = userLgd.email;
            user.photoUrl = userLgd.photoURL;
            user.emailVerified = userLgd.emailVerified;
            user.uid = userLgd.uid;
         }
      }, 112)
   }
   vm.alteraDados = function () {

      auth.updateProfile(user);
   }
   vm.excluiUsuario = function () {
      auth.deleteUser();
   }

   vm.alterarSenha = function () {

      auth.passReset(user)
   }
}