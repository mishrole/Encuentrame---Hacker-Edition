function initMap() {

  var laboratoriaLima = {lat: -12.0349691, lng: -77.0639408};
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: laboratoriaLima
  });

  var marcadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });

  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click", buscar);

  var latitud,longitud;

  var funcionExito = function(posicion){
    
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map: map
    });

    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  }

  var funcionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }
}