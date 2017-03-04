const MAX_DEPTH = 1;
const MAX_WIDTH = 1;

var locations = [];
var map = {};

function distance(loc1,loc2)
{
  return calcCrow(loc1.longitude, loc1.latitude, loc2.longitude, loc2.latitude);
}

var getNearest(n, location, locations)
{
  locations.sort(function (x, y) {
    return distance(x, location) - distance(y, location);
  })
  return location[1:n];
}


function heuristic(state)
{
  var acc = 0;
  for( injured in state['injured'] ){
    var distance = -1;
    for( healer in state['healers'] )
    {
      if (distance == -1) distance = distance(injured,healer);
      if (distance > distance(injured,healer) ) distance = distance(injured,healer);
    }
    acc += distance;
  }
}

function solve(state)
{
  for( injured in state['injured'] ) location.push(injured);
  for( healer in state['healers'] ) location.push(injured);
  recursiveSolve(state,MAX_DEPTH,[state])

}

function recursiveSolve(state, depth, previous) {

  for (injured in state['injured'] ){
    if (not injured.motionless) {
      for (location in getNearest(MAX_WIDTH, injured, locations)){

      }
    }
  }

}







//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

function calcCrow(lat1, lon1, lat2, lon2)

{

  var R = 6371; // km

  var dLat = toRad(lat2-lat1);

  var dLon = toRad(lon2-lon1);

  var lat1 = toRad(lat1);

  var lat2 = toRad(lat2);



  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +

    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;

}



// Converts numeric degrees to radians

function toRad(Value)

{

    return Value * Math.PI / 180;

}
