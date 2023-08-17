module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','You need to be logged in');
        return res.redirect("/login");
    }
    next();
}

module.exports.login = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect("/urlShortener/home");
    }
    next();
}