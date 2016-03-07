process.send("Created new process. PID: " + process.pid);

// load modules
var localtunnel = require('localtunnel');
var config = require('config');

// initialize parameters
var subdomain = config.get('subdomain');

// Start tunnel  
tunnel = localtunnel(80, {
  subdomain: subdomain
}, function(err, tunnel) {
  if (err) {
    process.send(err);
    process.send("Fatal Error");
    process.exit();
  }

  var httpURL = tunnel.url.replace('https://', 'http://');
  process.send("Started tunnel on URL: " + httpURL);
});