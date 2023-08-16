const express = require('express');
const router = express.Router();
const urls = require('../controllers/urls');
const {isLoggedIn} = require('../middlewares');

router.get("/home",isLoggedIn,urls.home);

router.get("/aboutus",urls.aboutUs);

router.get("/myUrls",isLoggedIn,urls.myUrls);

router.post("/generateUrl",isLoggedIn,urls.generateUrl);

router.get("/home/:shortId",urls.getUrl);

module.exports = router;