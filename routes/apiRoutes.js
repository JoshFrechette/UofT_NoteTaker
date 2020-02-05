var db = require("../db/db");//db/db.json
// var db = require("../db/journal.json");
var fs = require("file-system");
// var fs = require("fs");
var path = require("path");


module.exports = function (app) {

    //Save a note
    app.post("/api/notes", function (req, res) {//Get the text from the html
        let newNote = req.body;
        newNote.id = getId();

        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            noteObj = JSON.parse(data);
            noteObj.push(newNote);
            fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify(noteObj), (err) => {
                if (err) {
                    throw err
                }
            })
            db.push(noteObj)
            // return res.json(JSON.parse())
        })
        noteObj = {};
    })


        // Delete a note
        app.delete("/api/notes/:id", function (req, res) {

           // console.log("req" + req.params.id)
            let id = req.params.id
            console.log("notes id " + id)
            // fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            //     if (err) {
            //         throw err;
            //     }
            //     let noteObj = JSON.parse(data);
            //     console.log("object before " + noteObj[0].title)

                
                for (i = 0; i < noteObj.length; i++) {
                    // console.log("id from the click " + id)
                    if (noteObj[i].id === id) {
                     return i
                    }
                    console.log("index position " + i)
                    noteObj.splice(i, 1);
                    console.log("object after " + noteObj)
                }

                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(noteObj), (err, data) => {
                    if (err) {
                        throw err
                    }
                    console.log(data)
                    // return res.json(JSON.parse(data))
                })
                res.end()
            });
        

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
