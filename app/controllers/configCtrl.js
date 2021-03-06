'use strict';
var guia = angular.module("guia");

guia.controller('configCtrl', configCtrl);

configCtrl.$inject = ['$scope', 'authService', '$timeout', '$http'];

function configCtrl($scope, authService, $timeout, $http) {
   var vm = $scope;
   var auth = authService

   var HOST_HTTP = 'https://turismo-api-v1.herokuapp.com/';


   var user = $scope.user = {
      name: '',
      email: '',
      password: 'user.password',
      photoUrl: '',
      uid: '',
      emailVerified: ''
   }

   // vm.buscaDadosUserr = function () {
   //    $http.get(HOST_HTTP + '/produtos').then(
   //       function (response) {
   //          vm.produtos = response.data;
   //       },
   //       function (err) {
   //          console.log(err)
   //       }
   //    );
   // };


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
   vm.alteraEmail = function () {
      // usar ng-repeat

      auth.updateProfile(user.email);
   }
   vm.excluiUsuario = function () {
      auth.deleteUser();

      $http.delete(HOST_HTTP + 'usuario/deletar/' + user.email).then(
         function (response) {
            console.log(response);
         },
         function (err) {
            console.log(err);
         }
      );
   }

   vm.alterarSenha = function () {

      auth.passReset(user)
   }
}