
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



/*********************   TESTE Ramon  ********************************** */

/*Inicializa o MAPA*/
var geocoder;
var map;
var marker;
 
function initialize() {
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
 
    geocoder = new google.maps.Geocoder();
 
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });
 
    marker.setPosition(latlng);
}
 
$(document).ready(function () {
    initialize();

    /* Exibindo no mapa o endereço digitado */

    function carregarNoMapa(endereco) {
        geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
 
                    $('#txtEndereco').val(results[0].formatted_address);
                    $('#txtLatitude').val(latitude);
                    $('#txtLongitude').val(longitude);
 
                    var location = new google.maps.LatLng(latitude, longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(16);
                }
            }
        });
    }

    /* chamada dessa função no evento click do botão “Mostrar no mapa” e no evento blur do campo endereço...
    Não sei o que é esse evento blur, mas é o que estava no site Kkk */

    $("#btnEndereco").click(function() {
        if($(this).val() != "")
            carregarNoMapa($("#txtEndereco").val());
    })
 
    $("#txtEndereco").blur(function() {
        if($(this).val() != "")
            carregarNoMapa($(this).val());
    })



    /* mexer no marcador e atualizar o endereço */
    google.maps.event.addListener(marker, 'drag', function () {
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) { 
                    $('#txtEndereco').val(results[0].formatted_address);
                    $('#txtLatitude').val(marker.getPosition().lat());
                    $('#txtLongitude').val(marker.getPosition().lng());
                }
            }
        });
    });

    /*Autocomplete */
    $("#txtEndereco").autocomplete({
        source: function (request, response) {
            geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                response($.map(results, function (item) {
                    return {
                        label: item.formatted_address,
                        value: item.formatted_address,
                        latitude: item.geometry.location.lat(),
                        longitude: item.geometry.location.lng()
                    }
                }));
            })
        },
        select: function (event, ui) {
            $("#txtLatitude").val(ui.item.latitude);
            $("#txtLongitude").val(ui.item.longitude);
            var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
            marker.setPosition(location);
            map.setCenter(location);
            map.setZoom(10);
        }
    });
});
