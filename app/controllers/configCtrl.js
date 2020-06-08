'use strict';
var guia = angular.module("guia");

guia.controller('configCtrl', configCtrl);

configCtrl.$inject = ['$scope', 'authService', '$location'];

function configCtrl($scope, authService, $location) {
   var vm = $scope;
   var auth = authService
   var verificado

   var user = $scope.user = {
      name: '',
      email: '',
      password: 'user.password',
      photoUrl: '',
      uid: '',
      emailVerified: ''
   }

   vm.verificaUsuario = function () {
      verificado = true

      // auth.login(user)
      //    .then(function (firebaseUser) {
      //       alert('Menu Liberado!');

      //       verificado = true
      //    })
      vm.buscaDados();
   }

   vm.buscaDados = function () {

      var userLgd = auth.isLoggedIn();


      if (userLgd != null) {
         user.name = userLgd.displayName;
         user.email = userLgd.email;
         user.photoUrl = userLgd.photoURL;
         user.emailVerified = userLgd.emailVerified;
         user.uid = userLgd.uid;
      }
   }
   vm.alteraDados = function () {
      var userLgd = auth.isLoggedIn();

      userLgd.updateProfile({
         name: "Jane Q. User",
         photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function () {
         // Update successful.
      }).catch(function (error) {
         // An error happened.
      });
   }
   vm.test = function () {
      alert('Ok')
   }
}