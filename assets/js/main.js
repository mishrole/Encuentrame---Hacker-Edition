function initMap() {

  var laboratoriaLima = {lat: -12.0349691, lng: -77.0639408};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: laboratoriaLima
  });

  var marcadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map,
    animation: google.maps.Animation.DROP
  });

  marcadorLaboratoria.addListener("click", toggleBounce);

  function toggleBounce(){
    if(marcadorLaboratoria.getAnimation() !== null){
      marcadorLaboratoria.setAnimation(null);
    }else{
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click", buscar);

  var latitud,longitud,miUbicacion;

  var funcionExito = function(posicion){
    
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map: map,
      animation: google.maps.Animation.DROP
    });

    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  }

  var funcionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }

  var inputPartida = document.getElementById("punto-partida");
  var inputDestino = document.getElementById("punto-destino");

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var tarifa = document.getElementById("tarifa");
  var textoTarifa = document.getElementById("textoTarifa");

  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status){
      if(status === 'OK'){

        var distancia = Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
          tarifa.classList.remove("none");

          var costo = distancia * 1.75;

          if(costo < 4.0){
            textoTarifa.innerHTML = "S/. 4"
          }else{
            textoTarifa.innerHTML = "S/. " + parseInt(costo);
          }

          console.log(response.routes[0].legs[0].distance.text);
          directionsDisplay.setDirections(response);

          if(miUbicacion !== undefined){
            miUbicacion.setMap(null);
          }

          marcadorLaboratoria.setMap(null);
          
      }else{
        window.alert("No encontramos una ruta.");
      }
    });
  }

  directionsDisplay.setMap(map);

  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
}