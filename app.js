const express=require("express");
const path =require("path");

const app=express();
const port=8001;


app.set("view engine",'ejs');
app.set('views',path.resolve('./views'))

const URL=require('./models/url')

const routerUrl=require("./router/url");
const staticRout=require('./router/staticRouter')
const userRouter=require('./router/user');

const {connectToDB}=require("./connect");
connectToDB('mongodb://127.0.0.1:27017/URLShortner')
.then(()=>console.log("mongodb connected...."))

app.get('/urls/:shortId',async (req,res)=>{
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

app.use(express.urlencoded({extended:false}))//middleware to parese html 
app.use(express.json())//middleware to parse json

app.use('/',staticRout);
app.use("/url",routerUrl);
app.use("/user",userRouter);

app.listen(port,()=>{
    console.log("Server started at port 8002");
})