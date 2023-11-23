const express = require('express');
const mongoose = require('./db/connection');

const bodyparser =require('body-parser');
// const multer = require('multer')
const cookieParser =require('cookie-parser');
const session= require("express-session")




const app = express();



app.set('view engine', 'ejs');
app.use('/assets',express.static('assets'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.use('/upload', express.static('upload'))

app.use(cookieParser());
app.use(
    session({
        key:"user_id",
        secret:"secretuuyuyuh",
        resave:false,
        saveUninitialized: false,
        cookie:{
            expires: 600000,
        },
    })

);

app.use((req,res,next)=> {
    if(req.cookies.user_id && !req.session.user){
        res.clearCookie("user_id");
    }
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_id) {
      res.redirect("/dashboard");
    } else {
     next();
   }
  
  };
  app.use(require('./routes/controlier'));

app.listen(8000, ()=>{
    console.log("listing to 8000 port")
});