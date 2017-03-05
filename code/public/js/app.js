var user = {};
var myid;
var mapsurl;
var pos = {};

//init

$(document).ready(function() {


//Init map
  function initGeo() {

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          })
        }
      };


//Hide and show divs
  user = {"danger":0,"movement":0,"latitude":0,"longitude":0,"services":[0,0]};

  var socket = io();

  initGeo();

  user["latitude"] = pos["lat"];
  user["longitude"] = pos["lng"];

  $("#btnOkYes").click(function(event) {
    $(".ok").hide("slow");
    $(".offer").show("slow");
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
    socket.emit('newUser',user);
    socket.emit('askWheretogo', "");

    $("#btnStopJob").show("slow");
  });

  $("#btnMoveNo").click(function(event) {
    $(".move").hide("slow");
    $(".message").show("slow");
    user["movement"] = 1;
    user["latitude"] = pos["lat"];
    user["longitude"] = pos["lng"];
    socket.emit('newUser',user);
    socket.emit('askWheretogo', "");

    $("#btnStopJob").show("slow");
  });

  $("#btnStopJob").click(function(event) {
    $(".ok").hide("slow");
    $(".move").hide("slow");
    $(".offer").hide("slow");
    $(".message").hide("slow");
    $(".waitMessage").hide("slow");
    $(".toMap").hide("slow");
    $(".message1").hide("slow");
    $(".stopJob").show("slow");
    socket.emit('jobDone',myid);
  });


//Create offer

  $("#btnOfferYes").click(function(event) {
    user["services"][0] = 1;
    user["latitude"] = pos["lat"];
    user["longitude"] = pos["lng"];
    $(".offer").hide("slow");
    $(".waitMessage").show("slow");
    socket.emit('newUser',user);
    socket.emit('askWheretogo', "");
    $("#btnStopJob").show("slow");
    });

  $("#btnOfferNo").click(function(event) {
    $(".offer").hide("slow");
    $(".message1").show("slow");
  });


//Sockets
  socket.on('sendPerson', function(msg){
      var latitudetogo = msg.latitude;
      var longitudetogo = msg.longitude;
      var mapsurl = "http://maps.google.com/?q=" + latitudetogo + "," + longitudetogo;
      $(".waitMessage").hide("slow");
      $(".toMap").show("slow");
      document.getElementById("btnToMap").setAttribute("href",mapsurl);
  });

  socket.on('sendID',function(id){
       myid = id;
  });

});
