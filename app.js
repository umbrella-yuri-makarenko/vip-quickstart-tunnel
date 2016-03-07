var cp = require('child_process');

var startTunnel = function(){
	var child = cp.fork('./worker');

	child.on('message', function(m) {
	  // Receive results from child process
	  console.log(m);
	});
	child.on('exit', function() {
	  console.log('Process killed.');
	  startTunnel();
	});
}
startTunnel();