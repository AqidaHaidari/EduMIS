
const express = require("express");
const app = express();
const path = require("path")
const body_parser = require('body-parser');
const ejs=require('ejs');
require ('dotenv').config ();

const connection=require('mongoose')
const index=require('./routes/indexRoute')
const StudentRegistration=require('./routes/StudentRegistration')
const department = require("./routes/department");
const newClass = require("./routes/newClass");

const multer=require('multer')

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json())
app.use(multer({storage:fileStorage }).single('image'))
app.use(express.static(path.join(__dirname,'public')));
app.use("/images",express.static(path.join(__dirname,'images')));

    

app.set('view engine','ejs')

app.use(index)
app.use(StudentRegistration);
app.use(department);
app.use(newClass)

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

connection.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT)
   
})
.catch(err=>console.log(err))



