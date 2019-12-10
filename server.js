//Dependencies 
var http = require("http");
var express = require("express");
var fs = require("fs");
var path = require("path");
var http = require("http");
//Set up
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

var server = http.createServer(handleRequest);

//GET functions *****
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Read a note
app.get("/api/notes", function (req, res) {
  let readnote = JSON.stringify(data);
  fs.readFile(__dirname + "./db/db.json", function (err, data) {
    if (err) throw err;
    return res.json(JSON.parse(data))
  })
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(data);
});

//Initialize homepage
function handleRequest(req, res) {

  fs.readFile(__dirname + "/public/index.html", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  })

  var path = req.url;

  switch (path) {

    case "/":
      return displayRoot(res); //index.html file 

    case "/notes":
      return displayNotes(res); //notes.html file

    default:
      return display404(path, res); //Error msg
  }
}

function displayRoot(res) {
  fs.readFile(__dirname + "/public/index.html", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  })
}

function displayNotes(res) {
  fs.readFile(__dirname + "/public/notes.html", function (err, data) {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  })
}

function display404(url, res) {
  var myHTML = "<html>" +
    "<body><h1>404 Not Found </h1>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(myHTML);
}

//API Routes*************
//Create new note
app.post("/api/notes", function (req, res) {
  let newnote = req.body;
  console.log(newnote)
  fs.readFile(__dirname + '/db/db.json', 'utf8', readnote, err => {
     let readnote = JSON.parse(data);
  })
  .then()
  fs.writeFile(__dirname + '/db/db.json', readnote, err => {

  })
});

// Delete a note
app.delete("/api/notes", function (req, res) {
  // let readnote = JSON.stringify(data);
  fs.deleteFile(__dirname + '/db/db.json', readnote, err => {

  })
});

server.listen(PORT, function () {
  console.log("Server listening Note-Taker on: http://localhost:" + PORT);
});

