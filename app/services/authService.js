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
            passReset: passReset
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

      })