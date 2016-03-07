var cp = require('child_process');
var child = cp.fork('./worker');

child.on('message', function(m) {
  // Receive results from child process
  console.log('received: ' + m);
});
