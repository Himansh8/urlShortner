const jwt=require("jsonwebtoken");
const secert="himanshu@!123";

function setUser(id,user){
    const payload={
        ...user,
    }
    return jwt.sign(payload,secert);
}

function getUser(token){
    return jwt.verify(token,secert);
}

module.exports={
    setUser,
    getUser,
}