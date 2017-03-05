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
        center: {lat: 41.388935, lng: 2.113337},
        zoom: 12
      });

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

$(document).ready(function() {

});
