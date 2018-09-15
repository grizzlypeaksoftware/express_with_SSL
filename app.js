// dependencies
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require("fs");

var app = express();

/* GET home page. */
app.get('/', function (req, res) {
    res.send("HELLO WORLD");
});

// file location of private key
var privateKey = fs.readFileSync( 'private.key' );

// file location of SSL cert
var certificate = fs.readFileSync( 'ssl.crt' );

// set up a config object
var server_config = {
    key : privateKey,
    cert: certificate
};

// create the HTTPS server on port 443
var https_server = https.createServer(server_config, app).listen(443, function(err){
    console.log("Node.js Express HTTPS Server Listening on Port 443");
});

// create an HTTP server on port 80 and redirect to HTTPS
var http_server = http.createServer(function(req,res){

    // 301 redirect (reclassifies google listings)
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80, function(err){
    console.log("Node.js Express HTTPS Server Listening on Port 80");    
});
