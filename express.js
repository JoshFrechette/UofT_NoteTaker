var http = require("http");
var express = require('express');
var fs = require("fs");
var index = require("./public/assets/js/index.js");

var http = require("http");

var PORT = 8080;

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

    fs.readFile(__dirname + "/index.html", function(err, data) {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

server.listen(PORT, function() {
  console.log("Server listening Note-Taker on: http://localhost:" + PORT);
});

function handleRequest(req, res) {

  var path = req.url;

  switch (path) {

  case "*":
    return displayRoot(res); //index.html file 

  case "/notes":
    return displayNotes(res); //notes.html file

  default:
    return display404(path, res);
  }
}




