var db = require("../db/db");//db/db.json
// var db = require("../db/journal.json");
var fs = require("file-system");
// var fs = require("fs");
var path = require("path");

fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    noteObj = JSON.parse(data);
    return noteObj
})


module.exports = function (app) {

    //Save a note
    app.post("/api/notes", function (req, res) {//Get the text from the html
        console.log(req.body)
        let newNote = {};
        newNote.id = getId();
        newNote.title = req.body.title;
        newNote.text = req.body.text;
  
        // newNote.id += ":" + {title: req.body.title, text: req.body.text};
        // let id = getId();
        // let newNote = "{" + id + ":{" + "title:" + req.body.title + "," + "text:" + req.body.text + "}";
        // console.log(JSON.stringify(newNote))
        console.log(newNote)
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            noteObj = JSON.parse(data);
            noteObj.push(newNote);
            fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err) => {
                if (err) {
                    throw err
                }
            })
            db.push(noteObj)
            // return res.json(JSON.parse())
        })
        // noteObj = {};
    })

    // Delete a note
    app.delete("/api/notes/:id", function (req, res) {
        let id = JSON.parse(req.params.id);
            console.log(noteObj[0].id)
            console.log(id)
            for (i = 0; i <= noteObj.length; i++) {
                if (noteObj[i].id === id) {
                    noteObj.splice(i, 1);
                    console.log(noteObj)
                    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err) => {
                        if (err) {
                            throw err
                        }
                        console.log("this is post noteObj " + noteObj)
                        db =[];
                        db.push(noteObj)
                        return res.json(noteObj)
                    })
                }
            }
    })

    //Display stored note(s)
    app.get("/api/notes", function (req, res) {
        // return res.json(db)
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
            if (err) {
                throw err;
            }
            return res.json(JSON.parse(data))
        })
    });
}

//Create a unique id# for every note entry
function getId() {
    let id = (Math.floor(Math.random() * 100000));

    return id
};
