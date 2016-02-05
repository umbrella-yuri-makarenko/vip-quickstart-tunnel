var localtunnel = require('localtunnel');
var mysql       = require('mysql');
var connection  = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wordpress'
});
var child_process = require('child_process');

var args = process.argv.slice(2);
var subdomain = typeof args[0] != 'undefined' ? args[0] : '';

var tunnel = localtunnel(80, {
    subdomain: subdomain
}, function(err, tunnel) {
    if (err) {
       console.log(err);
       throw new Error('VIP QuickStart Tunnel: Fatal Error');
    }

    var httpURL = tunnel.url.replace('https://', 'http://');
    var domain = httpURL.replace('http://', '');

    console.log("VIP QuickStart Tunnel: Update VIP Quickstart parameters");
    connection.query('UPDATE wordpress.wp_site SET domain = "'+domain+'" WHERE id > 0;');
    connection.query('UPDATE wp_blogs SET domain = "'+domain+'" WHERE blog_id > 0;');
    connection.query('UPDATE wp_2_options SET option_value = "'+httpURL+'/stylecaster" WHERE option_name = "siteurl" OR option_name = "home";');

    console.log("VIP QuickStart Tunnel: Clear cache");
    child_process.exec('sudo service memcached restart');

    console.log("VIP QuickStart Tunnel: Your URL is " + httpURL);
});