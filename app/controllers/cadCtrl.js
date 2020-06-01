'use strict';
var guia = angular.module("guia");

guia.controller('cadCtrl', cadCtrl);

cadCtrl.$inject = ['$scope', 'authService'];

function cadCtrl($scope, authService) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      name: '',
      email: '',
      password1: '',
      password2: ''
   }


   vm.cadastro = function () {

      if (user.password1 === user.password2) {

         user.password = user.password1

         //Cadastro no Firebase
         auth.register(user)
            .then(function (firebaseUser) {
               alert('Bem vindo ' + firebaseUser.user.email + "!");

            }).catch(function (error) {
               alert(error)

            })

         //Cadastro no Mongodb


      } else {
         alert('As senhas não coincidem!')
      }
   }
}
