const urlModel = require('../models/urls');
const shortid = require('shortid');

module.exports.home =  async (req,res) => {
    res.render("urls/home");
}

module.exports.aboutUs = (req,res)=>{
    res.render("aboutUs");
}

module.exports.myUrls = async (req,res) => {
    const userIdToFind = req.user._id;
    const urls = await urlModel.find({user:userIdToFind});
    res.render("urls/myurls",{urls});
}

module.exports.generateUrl = async (req,res)=>{
    const {url} = req.body;
    const shortId = shortid();
    const newUrl = await new urlModel({fullUrl:url,shortId:shortId,clicks:0,user:req.user._id});
    await newUrl.save();
    res.redirect("/urlShortener/home");
}

module.exports.getUrl = async (req,res)=>{
    const {shortId} = req.params;
    const foundUrl = await urlModel.findOne({shortId:shortId});
    foundUrl.clicks+=1;
    await foundUrl.save();
    const redirectUrl = foundUrl.fullUrl;
    res.redirect(redirectUrl);
}