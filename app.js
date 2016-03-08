var args = process.argv.slice(2);

if ( typeof args[0] != 'undefined' && args[0] == 'subdomain' && typeof args[1] != 'undefined' ) {
	console.log('Changing subdomain to : ' + args[1] );

	var fs = require('fs');
	var mysql       = require('mysql');
	var connection  = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'wordpress'
	});

	try {
		var config = require('./config/default.json');
	} catch (ex) {
		var config = {};
	}

	// save config file
	config.subdomain = args[1];
	fs.writeFileSync('./config/default.json', JSON.stringify(config, null, 2) , 'utf-8'); 

	// update parameters in database
	var domain = config.subdomain + ".localtunnel.me";
	var httpURL = "http://" + domain;
	connection.query('UPDATE wp_site SET domain = "'+domain+'" WHERE id > 0;');
    connection.query('UPDATE wp_blogs SET domain = "'+domain+'" WHERE blog_id > 0;');
    connection.query('UPDATE wp_2_options SET option_value = "'+httpURL+'/stylecaster" WHERE option_name = "siteurl" OR option_name = "home";');
    connection.query('UPDATE wp_3_options SET option_value = "'+httpURL+'/dailymakeover" WHERE option_name = "siteurl" OR option_name = "home";');

	setTimeout(function(){
		console.log('Saved subdomain: ' + config.subdomain);
		process.exit();
	},5000);
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