const mongoose = require('mongoose');
const {Schema} = mongoose;

const urlSchema = new Schema({
    fullUrl:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    clicks:Number
})

const Url = mongoose.model('url',urlSchema);

module.exports = Url;