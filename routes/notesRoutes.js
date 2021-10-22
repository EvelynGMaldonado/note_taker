const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { notStrictEqual } = require("assert");

const DIR_DATABASE = path.resolve(__dirname, "../db")


//"api"
router.get("/notes",(req,res)=>{
    const notes = readFile();
    res.json(notes) //////////////////
})

router.post("/notes",(req,res)=>{
    const newTask = req.body
    newTask.id = uuidv4();
    const notes = readFile();
    notes.push(newTask)
    fs.writeFileSync(path.join(DIR_DATABASE, "notes.json"),JSON.stringify(notes)) ////////////////////////
    console.log("done")
    res.json({message:"data recieved"})
     
})

router.delete("/notes/:id", (req,res)=> {
    //filter data 
    const deleteNote = req.params.id;
    let notes = readFile();
    notes = notes.filter(note => note.id != deleteNote)
    fs.writeFileSync(path.join(DIR_DATABASE, "notes.json"),JSON.stringify(notes)) ////////////////////////
    console.log("done")
    res.json({message:"data deleted"})
}) 


const readFile = () => {
    try {
        return JSON.parse(fs.readFileSync(path.join(DIR_DATABASE, "notes.json"), "utf8"));
    } catch (err) {
        console.error(err);
    }
}


module.exports = router;