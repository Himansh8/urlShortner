const { getUser } = require("../services/auth");
// const {getUser}=require('../services/auth');

async function restrictToLoginUserOnly(req,res,next){
    const userUid=req.cookies.uid;

    if(!userUid) return res.redirect("/Login");

    const user=getUser(userUid);

    if(!user) return res.redirect('/Login');
     ;
    req.user=user;
    next();
}

module.exports={
    restrictToLoginUserOnly,
}