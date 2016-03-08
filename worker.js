process.send("Created new process. PID: " + process.pid);

// load modules
var localtunnel = require('localtunnel');
var config = require('./config/default.json');

// Start tunnel  
tunnel = localtunnel(80, {
  subdomain: config.subdomain ? config.subdomain : ''
}, function(err, tunnel) {
  if (err) {
    process.send(err.toString());
    process.exit();
  }

  var httpURL = tunnel.url.replace('https://', 'http://');
  process.send("Started tunnel on URL: " + httpURL);
});