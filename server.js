//Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

//Setup
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Basic Get Functions
//HTML routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Save a note
app.post("/api/notes", function (req, res) {//Get the text from the html
  let newnote = req.body;
  title = newnote.title;
  text = newnote.text;
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    if (err) { 
      throw err 
    }
    noteObj = JSON.parse(data);
    id = getId();
    noteObj.push({ title, text, id: id });
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteObj), (err) => {
      if (err) { 
        throw err 
      }
    })
    return res.json(JSON.parse(data))
  })
})

// Delete a note
app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id;
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    let noteObj = JSON.parse(data);
    console.log(noteObj)
    for (i = 0; i < noteObj.length - 1; i++) {
      if (noteObj[i].id === id) {
        return i
      }
      noteObj.splice(i, 1);
    }
    fs.writeFile('db/db.json',"utf8", noteObj, (err) => {
      if (err) {
        throw err
      }
    })
    return res.json(JSON.parse(data))
  })
});

//Display stored note(s)
app.get("/api/notes", function (req, res) {

  fs.readFileSync(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    content = data;
    updateNotes()
  })
});

function updateNotes(){
  return res.json(content);
}

//Create a unique id# for every note entry
function getId() {
  let id = (Math.floor(Math.random() * 100000));
  return id
};

app.listen(PORT, function () {
  console.log("Server listening to Note-Taker on http://localhost:" + PORT);
})
