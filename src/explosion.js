// Send a MIDI message.
var explosions = [
  // { x: 0, y: 0, time: 0 }
];
var frame = 0;

var midi = require('midi');

// Set up a new input. 
var input = new midi.input();

// Configure a callback. 
input.on('message', function(deltaTime, message) {
  var num = message[1];
  var x = Math.floor(num / 8);
  var y = num % 8;
  if (message[0] === 144) {
    console.log('Create an explosion at ' + x + ', ' + y);
    explosions.push({
      x: x,
      y: y,
      time: frame
    });
  }
});

// Open the first available input port. 
input.openPort(0);

// Set up a new output. 
var output = new midi.output();
// Open the first available output port. 
output.openPort(0);

for (i = 0; i < 40; i++) {
  output.sendMessage([144, i, 0]);
}

function dist(ax, ay, bx, by) {
  return Math.sqrt(
    Math.pow((ax - bx) * 1.3, 2) +
    Math.pow(ay - by, 2)
  );
}

setInterval(() => {
// setTimeout(() => {
  
  frame += 0.5;

  for (i = 0; i < 40; i++) {
    var num = i;
    var y = Math.floor(num / 8);
    var x = num % 8;
    var light = 0;
    for (j = 0; j < explosions.length; j++) {
      var explosion = explosions[j];
      var radius = frame - explosion.time;
      var distFromCenter = dist(x, y, explosion.y, explosion.x);
      if (Math.abs(distFromCenter - radius) < 0.3) {
        light += 1;
      }
    }
    var color = 0;
    if (light === 1) {
      color = 3;
    }
    if (light > 1) {
      color = 1;
    }
    output.sendMessage([144, i, color]);
  }

}, 50)


// for (i = 0; i < 40; i++) {
//   output.sendMessage([144, i, i]);
// }


