var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//making files in public served at /
app.use(express.static('public'))

app.get('/', function (req, res) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile("index.html", options, function (err) {
   if (err) {
     next(err);
   } else {
     console.log('Sent:', "index.html");
   }
 });
})

//Client to server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

//Serve html
app.get('/', function(req, res){
 	res.render('index.html', {});
});


//IO
//var transport={};
var medicalAid = {};
//medicalAid['userID']= {latitude: 124435, longitude: 43252678}
var injured = {}; //all injured
//injured['userID']= {motionless: 1, latitude: 124435, longitude: 43252678}
var people = {}; //userId of all users
var injuredCOUNT = 0;

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
	//var index = players.indexOf(socket.id);
  });
  socket.on('notAvailable', function(msg){
    if(msg.userID in medicalAid) delete medicalAid[msg.userID];
  });

  socket.on('disconnect', function(){
    delete people[socket.id];
  });
});



function mainloop() {
  if(injuredCOUNT>0){ 
    var state ={medicalAid, injured};
    //Call calculate routes function
    var routes = solve(state);
    //Send routes to clients
    for(var socketId in routes){
      var socket = people[socketId];
      socket.emit('sendPerson', routes[socketId].next);
    }
  }
}

setInterval(mainloop,10000);
