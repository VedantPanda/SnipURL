const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const urlRoutes = require('./routes/url');
const userRoutes = require('./routes/user');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/users');

mongoose.connect('mongodb://127.0.0.1:27017/Url-Shortener',{
    useNewUrlParser:true,
    useUnifiedTopology:true
    //useCreateIndex:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database Connected!");
})

app.engine('ejs',ejsMate);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({ extended: true }));

const configSession = {
    secret:"secret-key",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

app.use("/urlShortener",urlRoutes);
app.use("/",userRoutes);

app.listen(port,()=>{
    console.log("Server Started");
})