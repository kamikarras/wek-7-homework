let express = require('express');
let app = express();
require('dotenv').config()

const {Database} = require("quickmongo");

const db = new Database(process.env.MONGO_URL);

db.on("ready",()=>{
    console.log("connected to the database")
})

db.connect();

let notes = []


app.use(express.json());

app.post('/noteText',(req,res)=>{
    let currentDate = Date();
    let obj = {
        date: currentDate,
        note: req.body.noteText
    }
    db.push("notes-data",obj);
    

    // notes.push(obj)
    // console.log(notes)
    res.json({task:"sucess"});
})

app.get('/getNotes',(req,res)=>{
    db.get("notes-data").then(notesData=>{
        
        let obj = {data:notesData}
        res.json(obj)
    })
})

app.use('/',express.static('public'));



app.listen(3000,()=>{
    console.log("app listening at localhost:3000")
})