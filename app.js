var args = process.argv.slice(2);

if ( typeof args[0] != 'undefined' && args[0] == 'domain' && typeof args[1] != 'undefined' ) {
	console.log('Saved daomain name: ' + args[1]);
	return;
}

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