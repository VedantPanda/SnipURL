const users = require('../models/users');
const catchAsync = require('../utils/catchAsync');

module.exports.registerForm = (req,res) => {
    res.render("users/register");
}

module.exports.registerUser = catchAsync(async (req,res) => {
    const {fullName,username,password} = req.body;
    const user = new users({fullName:fullName,username:username});
    await users.register(user,password);
    res.redirect("/login");
})

module.exports.loginForm = (req,res) => {
    res.render("users/login");
}

module.exports.loginUser = (req,res) => {
    res.redirect("/snipUrl/home");
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}