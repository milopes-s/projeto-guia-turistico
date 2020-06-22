
'use strict';
var guia = angular.module("guia");

guia.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'NgMap', 'authService'];

function homeCtrl($scope, NgMap, authService) {
    var vm = $scope;
    var auth = authService;

    var latitude = 0;
    var longitude = 0;


    vm.test1 = function () {
        console.log(latitude, longitude)

    }
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

    };
    var inputFrom = document.getElementById('txtEndereco');
    var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function () {
        var place = autocompleteFrom.getPlace();
        $scope.user.fromLat = place.geometry.location.lat();
        $scope.user.fromLng = place.geometry.location.lng();
        $scope.user.from = place.formatted_address;
    });

    //Pesquisa no Mapa
    $scope.search = "";
    $scope.geoCode = function () {
        if ($scope.search && $scope.search.length > 0) {
            if (!this.geocoder) this.geocoder = new googlw.maps.Geocoder();
            this.geocoder.geocode({ 'adress': $scope.search }, function (result, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    $scope.search = results[0].formatted_address;
                    $scope.gotoLocation(loc.lat(), loc.lng());
                } else {
                    alert("Desculpe, procura sem resultados!");
                }
            });
        }
    };

    /*Inicializa o MAPA*/
    var geocoder;
    var map;
    var marker;

    function initialize() {
        var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
        var options = {
            zoom: 5,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.satellite
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
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();

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
        $("#btnEndereco").click(function () {
            if ($(this).val() != "")
                carregarNoMapa($("#txtEndereco").val());
        })
        $("#txtEndereco").blur(function () {
            if ($(this).val() != "")
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

    });






};