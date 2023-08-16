const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const {login} = require('../middlewares');

router.get("/register",login,users.registerForm);

router.post("/register",login,users.registerUser);

router.get("/login",login,users.loginForm);

router.post("/login",login,passport.authenticate('local',{failureFlash:true,failureRedirect:"/login"}),users.loginUser);

router.get("/logout",users.logoutUser);

module.exports = router;