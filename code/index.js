var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var planner = require('./planner');



//making files in public served at /
app.use(express.static('public'))

//Client to server
http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//Serve html
app.get('/', function(req, res){
 	res.serveFile('index.html');
});


//IO
//var transport={};
var medicalAid = {};
//medicalAid['userID']= {latitude: 124435, longitude: 43252678}
var injured = {}; //all injured
//injured['userID']= {motionless: 1, latitude: 124435, longitude: 43252678}
var people = {}; //userId of all users


var injuredCOUNT = 1; //CANVIAR A 0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//Client server
io.on('connection', function(socket){
  if(!(socket.id in people)){
    people[socket.id] = socket;
  }
	socket.on('newUser', function(msg){
    if (msg.services[0] == 1){
      medicalAid[socket.id] = {latitude : msg.latitude, longitude : msg.longitude};
    }
    /*if(msg.services[1] == 1){
      transport.push(socket.id);
    }*/
    if(msg.danger == 1){
      injured[socket.id] = {motionless : msg.movement, latitude : msg.latitude, longitude : msg.longitude};
      injuredCOUNT++;
    }
    console.log(msg);
    io.emit('sendID',socket.id);
	});

  socket.on('updateUserState', function(msg){
    if(msg.danger == 1){
      if(userID in medicalAid) delete medicalAid[userID];
      if (!(userID in injured)) injuredCOUNT++;
      injured[userID] =  {motionless : msg.movement, latitude : msg.latitude, longitude : msg.longitude};
    }
    else if(userID in medicalAid){
      medicalAid[userID] = {latitude : msg.latitude, longitude : msg.longitude};
    }
  });
  socket.on('jobDone', function(){
    //To BE DONE
  });
  socket.on('notAvailable', function(msg){
    if(socket.id in medicalAid) delete medicalAid[socket.id];
    if(socket.id in people) delete people[socket.id];
    if(socket.id in injured){
      delete medicalAid[socket.id];
      injuredCOUNT--;
    }
    console.log(msg);
  });
  socket.on('requestAllPos', function(){
    console.log("request all pos");
    io.emit([medicalAid, injured]);
    console.log([medicalAid, injured]);
  });

  socket.on('disconnect', function(){
    delete people[socket.id];
    if(socket.id in people) delete people[socket.id];
    if(socket.id in injured){
      delete medicalAid[socket.id];
      injuredCOUNT--;
    }
  });
});



function mainloop() {
  if(injuredCOUNT>0){ 
    injured["_12345"] = {motionless: 0, latitude: 41.3918234, longitude: 2.1155787};
    medicalAid["_0987654"] = {latitude: 41.3918234, longitude: 2.1155787};
    var state ={"healers" : medicalAid,"injured": injured};

    //Call calculate routes function
    var routes = planner.solve(state);
    //console.log(state);
    //Send routes to clients
    for(var socketId in routes){
      console.log(socketId);
      if(routes[socketId].next != undefined && socketId[0]!='_'){
        var socket = people[socketId];
        socket.emit('sendPerson', routes[socketId].next);
        console.log("envio al marc les coses que ha calculat l'esteve")
        console.log(routes[socketId].next);
      }
    }
  }
}

setInterval(mainloop,10000);
