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

//Basic Get Functions
//HTML routes
app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Display stored note(s)
app.get("/api/notes", async function(req, res){
  await fs.readFile(__dirname + "/db/db.json", function (err, data) {
      if (err) throw err;
      return res.json(JSON.parse(data))
  })
});

//Save a note
app.post("/api/notes", function (req, res) {//Get the text from the html
  let newnote = req.body;
    title = newnote.title;
    text = newnote.text;
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
      noteObj = JSON.parse(data);
      id = getId();
      noteObj.push({title, text ,id: id});
      fs.writeFile(__dirname + '/db/db.json', JSON.stringify(noteObj),(err) => {
        if (err) throw err;
      })
  })
})
    
  // Delete a note
app.delete("/api/notes/:id", function (req, res) {
  let id = req.params.id -1;
  fs.readFile(__dirname + '/db/db.json', 'utf8', (err, data) => {
    let noteObj = JSON.parse(data);
    console.log(id)
    noteObj.splice(id, 1); //Is taking out every element after the selection 
    newNoteObj = JSON.stringify(noteObj);
    console.log(newNoteObj)
    fs.writeFile('db/db.json',newNoteObj,(err)=>{
        if (err) {
            throw err
        }
    })
  })
});

//Display stored note(s)
app.get("/api/notes", function(req, res){
  fs.readFile(__dirname + "/db/db.json", function (err, data) {
      if (err) throw err;
      return res.json(JSON.parse(data))
  })
});

//Create a unique id# for every note entry
function getId() {
  noteEntries = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8'));
  if (noteEntries.length === null) {
    return 1
  } else {
    return noteEntries.length +1
  }
};

app.listen(PORT, function (){
    console.log("Server listening to Note-Taker on http://localhost:" + PORT);
})
