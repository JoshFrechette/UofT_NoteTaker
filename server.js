var http = require("http");
var express = require('express');
var fs = require("fs");
var notedata = fs.readFile(__dirname +'/db/db.json');
var data = JSON.parse(notedata);
console.log(notes[0]);
// var index = require("./public/assets/js/index.js"); //Uneeded? jquery code interfering with the rest...

var http = require("http");

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var server = http.createServer(handleRequest);

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

app.get("*", function(req, res) {
  displayRoot()
  res.send("homepage");
});

app.get("/:notes", function(req, res) {
  displayNotes()
  // var chosen = req.params.character;
  res.end("note-taker");
});

//API Routes*************
// Read a note
app.get("/api/notes", function(req, res) {
  let readnote = JSON.stingify(data);

})
//Create new note
app.post("/api/notes", function(req, res) {
  let readnote = JSON.stingify(data);
  fs.writeFile(__dirname +'/db/db.json', readnote, err => {

  })
})
// Delete a note
app.delete("/api/notes", function(req, res) {
  let readnote = JSON.stingify(data);
  fs.deleteFile(__dirname +'/db/db.json', readnote, err => {

  })
});

server.listen(PORT, function () {
  console.log("Server listening Note-Taker on: http://localhost:" + PORT);
})
