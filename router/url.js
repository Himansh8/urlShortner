const express=require("express");
const {handleGenerateShortUrl,handleAnalytics}=require('../controllers/url');

const router=express.Router();

router.post('/',handleGenerateShortUrl);

router.get('/analytics/:shortId',handleAnalytics);

module.exports=router;