$(document).ready(function() {

//Init map
  function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 13
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
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

    google.maps.event.addDomListener(window, 'load', initMap);
});

*/

var socket = io();

socket.emit('requestAllPos',"");

socket.on('sendAllPos',function(allPos){
     var medAid = allPos[0];
     var injured = allPos[1];
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(-33.92, 151.25),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

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

    var marker, i;
    var pinColorYou = "077CF2"
    var pinColorMed = "01D516";

    for (i = 0; i < medAid.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(medAid[i].latitude, medAid[i].longitude),
        map: map
      });
    }
    for (i = 0; i < medAid.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(injured[i].latitude, injured[i].longitude),
        map: map,
      });
    }

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
