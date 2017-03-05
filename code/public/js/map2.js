var socket = io();

var medAid,injured;

socket.emit('requestAllPos',"");
socket.on('sendAllPos',function(allPos){
     medAid = allPos[0];
     injured = allPos[1];
     initMap();

});

function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12
      });
      var marker = new google.maps.Marker({
        position: {lat: -34.397, lng: 150.644},
        map: map
      });

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setCenter(pos);
          marker.setPosition(pos)
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      var pinColorYou = "077CF2";
      var pinColorMed = "01D516";
      for (var i in medAid) {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(medAid[i].latitude, medAid[i].longitude),
          map: map,
          icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=|00FF00'
        });
      }
      for (var i in injured) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(injured[i].latitude, injured[i].longitude),
          map: map,
          icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=|FF0000'
        });
      }
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(medAid[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

$(document).ready(function() {

});
