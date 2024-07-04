const express=require("express");

const app=express();
const port=8001;


const URL=require('./models/url')
const routerUrl=require("./router/url");

const {connectToDB}=require("./connect");
connectToDB('mongodb://127.0.0.1:27017/URLShortner')
.then(()=>console.log("mongodb connected...."))

app.get('/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            },
        }
    
    },{ new: true }
    );
    res.redirect(entry.redirectURL)
}
)

app.use(express.json())//middleware to parse json
app.use("/url",routerUrl);
app.listen(port,()=>{
    console.log("Server started at port 8002");
})