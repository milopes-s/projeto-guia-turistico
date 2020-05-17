'use strict';
var guia = angular.module("guia");

guia.controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', 'authService', '$location'];

function loginCtrl($scope, authService, $location) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      email: '',
      password: ''
   }

   vm.login = function () {
      auth.login(user)
         .then(function (firebaseUser) {
            alert('Bem vindo ' + firebaseUser.user.email);

            window.location.replace('#/home')
         })
         .catch(function (error) {

            //Tratamento de Erros
            if (error.code === "auth/wrong-password") {
               alert('E-mail ou Senha Incorretos!')
            } else if (error.code === "auth/too-many-requests") {
               alert('Muitas tentativas, aguarde alguns instantes e tente novamente!')
            } else {
               alert('Algo deu errado, Tente novamente!')
            }
         })
   }
}
