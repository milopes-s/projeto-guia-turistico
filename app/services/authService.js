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
            isLoggedIn: isLoggedIn
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
      })