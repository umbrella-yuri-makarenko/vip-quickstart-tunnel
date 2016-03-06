// load modules
var localtunnel = require('localtunnel');
var child_process = require('child_process');
var config = require('config');

// initialize parameters
var subdomain = config.get('subdomain');

// Start tunnel  
tunnel = localtunnel(80, {
  subdomain: subdomain
}, function(err, tunnel) {
  if (err) {
    console.log(err);
    throw new Error('VIP QuickStart Tunnel: Fatal Error');
  }

  var httpURL = tunnel.url.replace('https://', 'http://');
  console.log("Your URL is " + httpURL);
});
