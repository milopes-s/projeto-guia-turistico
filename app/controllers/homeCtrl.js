'use strict';
var guia = angular.module("guia");

guia.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'authService'];

function homeCtrl($scope, authService) {
   var vm = $scope;
   var auth = authService;

   var user = $scope.user = {
      email: '',
      password: ''
   }
   //Botão Sair 
   vm.logout = function () {
      auth.logout()
   }
   //teste do autocompet
   $scope.user = {'from': '', 'fromLat': '', 'fromLng' : ''};
    var options = {
        componentRestrictions: {country: "in"}
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();
        $scope.user.fromLat = place.geometry.location.lat();
        $scope.user.fromLng = place.geometry.location.lng();
        $scope.user.from = place.formatted_address;
    });
}





    

