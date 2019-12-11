//Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

//Setup
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Get Functions
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Read a note
app.get("/api/notes", function(req, res){
    fs.read(__dirname + ".db/db.json", function (err, data) {
        if (err) throw err;
        return res.json(JSON.parse(data))
    })
});

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "public/index.html"));
});

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
  fs.deleteFile(__dirname + '/db/db.json', readnote, err => {

  })
});

app.listen(PORT, function (){
    console.log("Server listening to Note-Taker on http://localhost:" + PORT);

})
