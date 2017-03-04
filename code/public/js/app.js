var user = {};

var myid;

var mapsurl;

//init


$(document).ready(function() {

  user = {"danger":0,"movement":0,"lat":52.48,"lng":48.5,"services":[0,0]};

  var socket = io();

  $("#btnOkYes").click(function(event) {
    $(".ok").hide("slow");
    $(".travel").show("slow");
    alert(JSON.stringify(user));
  });

  $("#btnOkNo").click(function(event) {
    $(".ok").hide("slow");
    $(".move").show("slow");
    user["danger"] = 1;
  });

  $("#btnMoveYes").click(function(event) {
    $(".move").hide("slow");
    $(".waitMessage").show("slow");
    socket.emit('newUser',user);
  });

  $("#btnMoveNo").click(function(event) {
    $(".move").hide("slow");
    $(".message1").show("slow");
    user["movement"] = 1;
  });

  $("#btnTravelYes").click(function(event) {
    $(".travel").hide("slow");
    $(".offer").show("slow");
  });

  $("#btnTravelNo").click(function(event) {
    $(".travel").hide("slow");
    $(".message2").show("slow");
  });

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
  });

});
