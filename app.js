var args = process.argv.slice(2);

if ( typeof args[0] != 'undefined' && args[0] == 'subdomain' && typeof args[1] != 'undefined' ) {
	var fs = require('fs');
	
	try {
		var config = require('./config/default.json');
	} catch (ex) {
		var config = {};
	}

	config.subdomain = args[1];
	fs.writeFileSync('./config/default.json', config.join(',') , 'utf-8'); 
	console.log('Saved subdomain: ' + config.subdomain);
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