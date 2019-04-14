#!/usr/bin/env node

var fs = require('fs');
var https = require('https');
const args = process.argv.slice(2);

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var CONFIG = JSON.parse(fs.readFileSync("/etc/stenographer/config"));
var HOST   = CONFIG.Host || '127.0.0.1';
var PORT   = CONFIG.Port || '1234';
var CPATH  = CONFIG.CertPath || "/etc/stenographer/certs";

if (!args[0]) { console.error('Missing query!'); process.exit(1); }

var query = args[0];

var options = {
    hostname: HOST,
    port: PORT,
    path: '/query',
    method: 'POST',
    key: fs.readFileSync( CPATH+'/client_key.pem'),
    cert: fs.readFileSync( CPATH+'/client_cert.pem'),
    ca: fs.readFileSync( CPATH+'/ca_key.pem') 
};

var req = https.request(options, function(res) {
    res.on('data', function(data) {
        process.stdout.write(data);
    });
});
req.write(query);

req.end();
req.on('error', function(e) {
    console.error(e);
});
