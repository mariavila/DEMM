const MAX_DEPTH = 3;
const MAX_WIDTH = 3;


var locations = [];

function distancef(loc1,loc2)
{
  return calcCrow(loc1.longitude, loc1.latitude, loc2.longitude, loc2.latitude);
}

function getNearest( n, location, locations)
{
  var ni = Math.min(n+1, locations.length);
  locations.sort(function (x, y) {
    return distancef(x, location) - distancef(y, location);
  });
  return locations.slice(1,ni);
}


function heuristic(state)
{
  var acc = 0;
  for(var injuredkey in state['injured'] ){
    var injured = state['injured'][injuredkey]
    var distanc = -1;
    for(var healerkey in state['healers'] )
    {
      var healer = state['healers'][healerkey];
      if (distanc == -1) distanc = distancef(injured,healer);
      if (distanc > distancef(injured,healer) ) distanc = distancef(injured,healer);
    }
    acc += distanc;
  }
}


// cost O( MAX_DEPTH^(MAX_WIDTH^npersones) ) ... suposu
var solve = function solve(state)
{
  for(var injuredkey in state['injured'] ) locations.push(copy(state['injured'][injuredkey]));
  for(var healerkey in state['healers'] ) locations.push(copy(state['healers'][healerkey]));
  var results = [];
  recursiveSolve(state,MAX_DEPTH,[state], results);
  var bestscore = -1;
  var beststate;
  for (var pathkey in results)
  {
    var path = results[pathkey];
    var firststate = path[0];
    var laststate =  path[path.length-1];
    if( bestscore == -1){
       bestscore = heuristic(laststate);
       beststate = firststate;
     }
    if (bestscore > heuristic(laststate) )
    {
       beststate = firststate;
    }
  }
  var apireturn = {};
  for (var healerkey in beststate['healers']){
    apireturn[healerkey] = {};
    apireturn[healerkey]['next'] = beststate['healers'][healerkey].next;
  }
  for (var injuredkey in beststate['injured'])
  {
    apireturn[injuredkey] = {};
    apireturn[injuredkey]['next'] = beststate['injured'][injuredkey].next;

  }
  return apireturn;
}

//cada estat te npersones i aquestes MAX_WIDTH possibles accions --> MAX_WIDTH^npersones possibles seguentes estats
function recursiveSolve(state, depth, previous, results) {
  if (depth == 0)
  {
    results.push(copy(previous));
    return 0;
  }

  for (var injuredkey in state['injured'] )
  {
    injured = state['injured'][injuredkey];
    if (! injured['motionless'])
    {
      injured['possibles'] = getNearest(MAX_WIDTH, injured, locations);
      delete injured['next']
    }
  }
  for (var healerkey in state['healers'] )
  {
      healer = state['healers'][healerkey];
      healer['possibles'] = getNearest(MAX_WIDTH, healer, locations)
      delete healer['next']
  }

  var resultSuc = [];
  generateSuccessors(state,resultSuc);
  for (var nstate in resultSuc)
  {
    var step = copy(resultSuc[nstate]);
    var nextPrevious = copy(previous);
    nextPrevious[nextPrevious.length] = step;
    recursiveSolve(copy(resultSuc[nstate]),depth-1, nextPrevious , results )
  }
}

function generateSuccessors(state,resultSuc)
{
  for (var injured in state['injured'] )
  {
    if (state['injured'][injured].next == undefined && state['injured'][injured].possibles != undefined ) {
      for (var next in state['injured'][injured]['possibles']){
        state['injured'][injured].next = state['injured'][injured]['possibles'][next];
        generateSuccessors(state,resultSuc);
      }
      return 0;
    }
  }
  for (var healer in state['healers'] )
  {
    if (state['healers'][healer].next == undefined) {
      for (var next in state['healers'][healer].possibles){
        state['healers'][healer].next = state['healers'][healer]['possibles'][next];
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
    { "h1" :
        {
          "latitude": 11,
          "longitude" : 12
        }

    },
    "injured" :
      {
        "i1" :
        {
          "motionless" : false,
          "latitude": 13,
          "longitude" : 14
        },       
         "i2" :
        {
          "motionless" : false,
          "latitude": 13,
          "longitude" : 15
        },
        "i3" :
        {
          "motionless" : true,
          "latitude": 14,
          "longitude" : 14
        }
      }
};

//console.log(solve(sample));
