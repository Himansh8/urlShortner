const User=require("../models/users");

async function handleUserSignup(req,res){
    const{name,email,password}=req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.redirect('/');
}

async function handleUserLogin(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
        return res.render('Login',{
            error:"Invalid Username or password",
        });
    }
    return res.redirect('/');
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}