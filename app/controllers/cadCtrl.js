'use strict';
var guia = angular.module("guia");

guia.controller('cadCtrl', cadCtrl);

cadCtrl.$inject = ['$scope', 'authService', '$http'];

function cadCtrl($scope, authService, $http) {
   var vm = $scope;
   var auth = authService;
   var HOST_HTTP = 'https://turismo-api-v1.herokuapp.com/';

   var user = $scope.user = {
      name: '',
      email: '',
      password1: '',
      password2: ''
      // photoUrl: './assets/profilePlaceholder.jpg'
   }


   vm.cadastro = function () {

      if (user.password1 === user.password2) {

         user.password = user.password1

         //Cadastro no Firebase
         auth.register(user)
            .then(function () {
               alert('Bem vindo ' + user.name + "!");
               //Cadastro no Mongodb
               $http.post(HOST_HTTP + 'usuario/cadastrar', user).then(
                  function (response) {
                     console.log(response)
                  },
                  function (err) {
                     console.log(err);
                  }
               )
               window.location.replace('#!feed')

            }).catch(function (error) {
               alert(error)

            })

      } else {
         alert('As senhas não coincidem!')
      }
   }
}
