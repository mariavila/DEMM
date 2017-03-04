const MAX_DEPTH = 1;
const MAX_WIDTH = 1;


var locations = [];

function distance(loc1,loc2)
{
  return calcCrow(loc1.longitude, loc1.latitude, loc2.longitude, loc2.latitude);
}

function getNearest( n, location, locations)
{
  var ni = Math.min(n+1, locations.length);
  locations.sort(function (x, y) {
    return distance(x, location) - distance(y, location);
  });
  return locations.slice(1,ni);
}


function heuristic(state)
{
  var acc = 0;
  for( injuredkey in state['injured'] ){
    var injured = state['injured'][injuredkey]
    var distance = -1;
    for( healerkey in state['healers'] )
    {
      var healer = state['healers'][healerkey];
      if (distance == -1) distance = distance(injured,healer);
      if (distance > distance(injured,healer) ) distance = distance(injured,healer);
    }
    acc += distance;
  }
}


// cost O( MAX_DEPTH^(MAX_WIDTH^npersones) ) ... suposu
var solve = function solve(state)
{
  for( injured in state['injured'] ) locations.push(injured);
  for( healer in state['healers'] ) locations.push(injured);
  var results = [];
  recursiveSolve(state,MAX_DEPTH,[state], results);
  var bestscore = -1;
  var beststate;
  for (pathkey in results)
  {
    var path = results[pathkey];
    var firststate = path[0];
    var laststate =  path[path.length-1];
    console.log(JSON.stringify(path));
    if( bestscore == -1){
       bestscore = heuristic(laststate);
       beststate = firststate;
     }
    if (bestscore > heuristic(laststate) )
    {
       beststate = firststate;
    }
  }
  return beststate;
}

//cada estat te npersones i aquestes MAX_WIDTH possibles accions --> MAX_WIDTH^npersones possibles seguentes estats
function recursiveSolve(state, depth, previous, results) {
  if (depth == 0)
  {
    results.push(copy(state));
    return 0;
  }

  for (injuredkey in state['injured'] )
  {
    injured = state['injured'][injuredkey];
    if (! injured['motionless'])
    {
      injured['possibles'] = getNearest(MAX_WIDTH, injured, locations)
    }
  }
  for (healerkey in state['healers'] )
  {
      healer = state['healers'][healerkey];
      healer['possibles'] = getNearest(MAX_WIDTH, healer, locations)
  }

  var resultSuc = [];
  generateSuccessors(state,resultSuc);
  for (nstate in resultSuc)
  {
    recursiveSolve(resultSuc[nstate],depth-1, previous.push(copy(resultSuc[nstate])), results )
  }
}

function generateSuccessors(state,resultSuc)
{
  for (injured in state['injured'] )
  {
    if (state['injured'][injured].next == undefined) {
      for (next in state['injured'][injured]['possibles']){
        state['injured'][injured].next = state['injured'][injured]['possibles'][next];
        generateSuccessors(state,resultSuc);
      }
      return 0;
    }
  }
  for (healer in state['healer'] )
  {
    if (state['healer'][healer].next == undefined) {
      for (next in state['healer'][healer].possibles){
        state['healer'][healer].next = next;
        generateSuccessors(state,resultSuc);
      }
      return 0;
    }
  }
  resultSuc.push(copy(state));
}


function copy(aux) {
  return(JSON.parse(JSON.stringify(aux)));
}


module.exports.solve = solve;

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


/////////////////test //////////////////

var sample =
{
  "healers" :
    { "userID" :
        {
          "latitude": 45.02,
          "longitude" : 23.43
        }
    },
    "injured" :
      {
        "userID" :
        {
          "motionless" : false,
          "latitude": 45.02,
          "longitude" : 23.43
        }
      }
};

console.log(solve(sample));
