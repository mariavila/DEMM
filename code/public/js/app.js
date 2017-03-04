var user = {};
var myid;
var mapsurl;
var pos = {};

//init

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
            pos = {
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


//Hide and show divs
  user = {"danger":0,"movement":0,"latitude":0,"longitude":0,"services":[0,0]};

  var socket = io();

  initMap();

  user["latitude"] = pos["lat"];
  user["longitude"] = pos["lng"];

  $("#btnOkYes").click(function(event) {
    $(".ok").hide("slow");
    $(".travel").show("slow");
  });

  $("#btnOkNo").click(function(event) {
    $(".ok").hide("slow");
    $(".move").show("slow");
    user["danger"] = 1;
  });

  $("#btnMoveYes").click(function(event) {
    $(".move").hide("slow");
    $(".waitMessage").show("slow");
    user["latitude"] = pos["lat"];
    user["longitude"] = pos["lng"];
    alert(JSON.stringify(user));
    socket.emit('newUser',user);
  });

  $("#btnMoveNo").click(function(event) {
    $(".move").hide("slow");
    $(".waitMessage").show("slow");
    user["movement"] = 1;
    user["latitude"] = pos["lat"];
    user["longitude"] = pos["lng"];
    socket.emit('newUser',user);
  });

  $("#btnTravelYes").click(function(event) {
    $(".travel").hide("slow");
    $(".offer").show("slow");
  });

  $("#btnTravelNo").click(function(event) {
    $(".travel").hide("slow");
    $(".message").show("slow");
  });

  $("#btnStopJob").click(function(event) {
    $(".ok").hide("slow");
    $(".travel").hide("slow");
    $(".move").hide("slow");
    $(".offer").hide("slow");
    $(".message").hide("slow");
    $(".waitMessage").hide("slow");
    $(".toMap").hide("slow");
    $(".stopJob").show("slow");
  });


//Create offer

  $("#btnOffer").click(function(event) {
    if (document.getElementById('medicalAid').checked) {
        user["services"][0] = 1;
      }
    if (document.getElementById('transport').checked) {
        user["services"][1] = 1;
      }
    user["latitude"] = pos["lat"];
    user["longitude"] = pos["lng"];
    alert(JSON.stringify(user));
    $(".offer").hide("slow");
    $(".waitMessage").show("slow");
    socket.emit('newUser',user);
    });


//Sockets
  socket.on('sendPerson', function(msg){
      var latitudetogo = msg.latitude;
      var longitudetogo = msg.longitude;
      mapsurl = "http://maps.google.com/?q=" + latitudetogo + "," + longitudtogo
      $(".waitMessage").hide("slow");
      $(".toMap").show("slow");
      document.getElementById("btnToMap").setAttribute("href",mapsurl);
  });

  socket.on('sendID',function(id){
       myid = id;
       alert(myid);
  });

});
