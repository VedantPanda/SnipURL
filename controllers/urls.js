const urlModel = require('../models/urls');
const shortid = require('shortid');
const catchAsync = require('../utils/catchAsync');
const validUrl = require('valid-url');
const ExpressError = require('../utils/ExpressError');
const axios = require('axios');

module.exports.home =  catchAsync(async (req,res) => {
    res.render("urls/home");
})

module.exports.aboutUs = (req,res)=>{
    res.render("aboutUs");
}

module.exports.myUrls = catchAsync(async (req,res) => {
    const userIdToFind = req.user._id;
    const urls = await urlModel.find({user:userIdToFind});
    res.render("urls/myurls",{urls});
})

module.exports.generateUrl = catchAsync(async (req,res)=>{
    const {url} = req.body;
    if(!validUrl.isWebUri(url)){
        throw new ExpressError("Invalid URL",400);
    }
    else{
        const response = await axios.head(url);
        if(response.status!=200){
            throw new ExpressError("URL does not exist",404);
        }
        else{
            const shortId = shortid();
            const newUrl = await new urlModel({fullUrl:url,shortId:shortId,clicks:0,user:req.user._id});
            await newUrl.save();
            res.redirect("/urlShortener/home");
        }
    }
})

module.exports.getUrl = catchAsync(async (req,res)=>{
    const {shortId} = req.params;
    const foundUrl = await urlModel.findOne({shortId:shortId});
    foundUrl.clicks+=1;
    await foundUrl.save();
    const redirectUrl = foundUrl.fullUrl;
    res.redirect(redirectUrl);
})