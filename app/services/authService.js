'use strict';
// var guia = angular.module("guia");

angular.module('authService', ['ngRoute', 'firebase'])
   .service('authService',
      function ($firebaseAuth) {
         var firebaseAuthObject = $firebaseAuth();

         var service = {
            firebaseAuthObject: firebaseAuthObject,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            passReset: passReset,
            deleteUser: deleteUser,
            updateProfile: updateProfile
         };

         return service;

         function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
         };
         function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
         };

         function logout() {
            firebaseAuthObject.$signOut();
         };
         function isLoggedIn() {
            return firebaseAuthObject.$getAuth();
         };
         function passReset(user) {
            var auth = firebase.auth()
            var emailAdress = user.email

            return auth.sendPasswordResetEmail(emailAdress)
         }
         function deleteUser() {
            var user = firebase.auth().currentUser;

            user.delete().then(function () {
               alert('Conta excluída com sucesso!')
               window.location.replace('#!login')
            }).catch(function (error) {
               alert('Ops, algo deu errado!')
            });
         }
         function updateProfile(user) {
            var userAtl = firebase.auth().currentUser;

            userAtl.updateProfile({
               displayName: user.name,
               photoURL: "https://example.com/jane-q-user/profile.jpg"
            }).then(function () {
               console.log('Deu bom caralhooo')
            }).catch(function (error) {
               console.log('Caralhooo')
            });
         }

      })