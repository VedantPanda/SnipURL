const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlModel = require('./models/urls');
const shortid = require('shortid');
const ejsMate = require('ejs-mate');

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

app.get("/home", async (req,res) => {
    res.render("home");
})

app.get("/aboutus",(req,res)=>{
    res.render("aboutUs");
})

app.get("/myUrls", async (req,res) => {
    const urls = await urlModel.find({});
    res.render("myurls",{urls});
})

app.post("/generateUrl", async (req,res)=>{
    const {url} = req.body;
    const shortId = shortid();
    const newUrl = await new urlModel({fullUrl:url,shortId:shortId,clicks:0});
    await newUrl.save();
    res.redirect("home");
})

app.get("/:shortId",async (req,res)=>{
    const {shortId} = req.params;
    const foundUrl = await urlModel.findOne({shortId:shortId});
    foundUrl.clicks+=1;
    await foundUrl.save();
    const redirectUrl = foundUrl.fullUrl;
    res.redirect(redirectUrl);
})

app.listen(port,()=>{
    console.log("Server Started");
})