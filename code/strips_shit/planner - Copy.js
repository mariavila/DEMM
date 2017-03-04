var strips = require('strips');

strips.verbose = true;

//Heuristic
//h, p or i
function rol(s) {
  return s[0];
}

//{"operation":"","action":"INHEALER","parameters":["h1","p1"]},{"operation":"and","action":"ININJURED","parameters":["i1","p2"]}
function whatAction(action) {
  if (rol(action['parameters'][0]) == 'h')
  {
    if (rol(action['parameters'][1]) == 'p')
    {
      return "walkhealer";
    } else {
      return "heal";
    }
  } else if (rol(action['parameters'][0]) == 'i')
  {
    return "walkinjured"
  }  else {
    return "action not dectected";
  }
}
//f(n) = g(n) + h(n)
//h(n) is a heuristic that estimates the cost of the cheapest path from n to the goal.

var cost = function cost(state) {
  var ret = 5;
  for (var i in state.actions) {
      var action = whatAction(state.actions[i]);
     //console.log(i);
      //console.log(action);
      if (action == 'walkinjured') {
      } else if (action == 'walkhealer') {
      } else if (action == 'heal') {
          ret -= 1;
      }
  }
  return ret;
}

// Load the domain and problem. 
strips.load('./strips_files/domain1.pddl', './strips_files/problem1.pddl', function(domain, problem) {
    // Run the problem against the domain. 
    var solutions = strips.solve(domain, problem,false,1,cost);

    console.log('finished solving');
 
    // Display each solution. 
    for (var i in solutions) {
        var solution = solutions[i];
 
        console.log('- Solution found in ' + solution.steps + ' steps!');
        for (var i = 0; i < solution.path.length; i++) {
            console.log((i + 1) + '. ' + solution.path[i]);
        }        
    }
});
