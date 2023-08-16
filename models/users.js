const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    fullName: {
        type:String,
        required:true
    }
})

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user',userSchema);

module.exports = user;