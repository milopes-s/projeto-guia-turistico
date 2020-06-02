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
            dataAll: dataAll
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
         // Config Controller
         function dataAll(user) {
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;

            if (user != null) {
               name = user.displayName;
               email = user.email;
               photoUrl = user.photoURL;
               emailVerified = user.emailVerified;
               uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
               // this value to authenticate with your backend server, if
               // you have one. Use User.getToken() instead.
            }
         }

      })