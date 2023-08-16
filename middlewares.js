module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
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