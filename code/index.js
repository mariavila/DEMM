var express = require('express');
var app = express();
var server = require('http').Server(app);
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
//var transport=[];
var medicalAid = {};
//medicalAid['userID']= {latitude: 124435, longitude: 43252678}
var injured = {}; //all injured
//injured['userID']= {motionless: 1, latitude: 124435, longitude: 43252678}
var people = []; //userId of all users

//Client server
io.on('connection', function(socket){
  if(!(socket.id in people)){
    people.push(socket.id);
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
    }
    io.emit('userID',socket.id);
	});

  socket.on('updateUserState', function(msg){
    if(msg.danger == 1){
      if(userID in medicalAid) delete medicalAid[userID];
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
});



function mainloop() {
  if(injured.length>0){

    //Calculate position arrays
    for(var i=0; i<people.length; ++i){
      positions.push(i);
      convPositions[people[i]]={latitude: info[people[i]].latitude, longitude : info[people[i]].longitude, posID : i};
      personPos[people[i]] = {posID : i};
    }

    for(var i=0; i<transport.length; ++i){
      transportPos[i] = convPositions[transport[i]].posID;
    }

    for(var i=0; i<medicalAidPos.length; ++i){
      medicalAidPos[i] = convPositions[medicalAid[i]].posID;
    }

    for(var i=0; i<injuredPos.length; ++i){
      injuredPos[i] = convPositions[injured[i]].posID;
    }

    for(var i=0; i<motionlessPos.length; ++i){
      motionlessPos[i] = convPositions[motionless[i]].posID;
    }



    //Call calculate routes function

    //Send routes to clients


  }


}

setInterval(mainloop,10000);
