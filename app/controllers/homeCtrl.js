'use strict';
var guia = angular.module("guia");

guia.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'NgMap', 'authService'];

function homeCtrl($scope, NgMap, authService) {
    var vm = $scope;
    var auth = authService;

    //Mostra usuário logado
    vm.isLogged = function () {
        console.log(auth.isLoggedIn())
    }
    //Faz logout no firebase
    vm.logout = function () {
        auth.logout()
    }


    //Autocomplete

    $scope.user = { 'from': '', 'fromLat': '', 'fromLng': '' };
    var options = {
        componentRestrictions: { country: "in" }
    };
    var inputFrom = document.getElementById('from');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
        var place = autocompleteFrom.getPlace();
        $scope.user.fromLat = place.geometry.location.lat();
        $scope.user.fromLng = place.geometry.location.lng();
        $scope.user.from = place.formatted_address;
    });

    //Implementa Mapa 

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });




    $scope.search = "";
    $scope.geoCode = function(){
        if ($scope.search && $scope.search.length > 0){
            if (!this.geocoder) this.geocoder = new googlw.maps.Geocoder ();
            this.geocoder.geocode({'adress': $scope.search }, function (result, status) {
                if (status == google.maps.GeocoderStatus.OK){
                    var loc = results [0].geometry.location;
                    $scope.search = results[0].formatted_address;
                    $scope.gotoLocation(loc.lat(), loc.lng());
                }else {
                    alert("Desculpe, procura sem resultados!");
                }
            });
        }
    };

     //CIDADES mexer depois
    // $scope.cities = [
        // { id: 1, name: 'Oslo', pos: [59.923043, 10.752839] },
        // { id: 2, name: 'Stockholm', pos: [59.339025, 18.065818] },
        // { id: 3, name: 'Copenhagen', pos: [55.675507, 12.574227] },
        // { id: 4, name: 'Berlin', pos: [52.521248, 13.399038] },
        // { id: 5, name: 'Paris', pos: [48.856127, 2.346525] }
    // ];
    // $scope.showCity = function (event, city) {
        // $scope.selectedCity = city;
        // $scope.map.showInfoWindow('myInfoWindow', this);
        // $scope.map.getBounds().contains(marker.getPosition());
    // };

};
