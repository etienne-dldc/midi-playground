var midi = require('midi');
 
// Set up a new input. 
var input = new midi.input();

// Configure a callback. 
input.on('message', function(deltaTime, message) {
  // The message is an array of numbers corresponding to the MIDI bytes: 
  //   [status, data1, data2] 
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful 
  // information interpreting the messages. 
  console.log('m:' + message + ' d:' + deltaTime);
});

// Open the first available input port. 
input.openPort(0);
 
var draw = [
  0, 0, 1, 1, 0, 1, 1, 1,
  0, 1, 0, 1, 0, 0, 0, 1,
  0, 1, 0, 1, 0, 0, 1, 1,
  0, 1, 0, 1, 0, 0, 0, 1,
  0, 0, 1, 1, 0, 1, 1, 1
];

// Set up a new output. 
var output = new midi.output();
 
// Open the first available output port. 
output.openPort(0);
 
// Send a MIDI message.

var frame = 0;

setInterval(() => {
  
  frame += 1;

  for (i = 0; i < 40; i++) {
    var num = (frame + i) % 40;
    var line = Math.floor(i / 8);
    var light = (line % 2 === 0) ? (num % 2 === 0 ? 1 : 3) : (num % 2 === 0 ? 3 : 1);
    output.sendMessage([144, i, light]);
  }

}, 300)


// for (i = 0; i < 40; i++) {
//   output.sendMessage([144, i, i]);
// }


