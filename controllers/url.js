
const shortid=require("shortid");
// console.log(shortid());
const URL =require("../models/url");

async function handleGenerateShortUrl(req,res){
    const body=req.body;
    // const shortID=shortid.generate();

    const shortID=shortid();

    if(!body.url) return res.status(400).json({error:'url is required'})

    if (!shortID) {
        throw new Error('Shortid cannot be null');
    }
    
    try{
        await URL.create({
            shortId:shortID,
            redirectURL:body.url,
            visitHistory:[],
            cretedBy:req.user._id,
        })
        return res.render('home',{
            id:shortID,
        })
        // return res.json({shortid: shortID});
    }catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ error: 'ShortId already exists. Try again.' });
        }
        console.error('Error inserting document:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleAnalytics(req,res){
    const shortId=req.params.shortId;

    const result=await URL.findOne({shortId})

    return res.json({
        totalclick: result.visitHistory.length,
        Analytics:result.visitHistory,
    })
}


module.exports = {
    handleGenerateShortUrl,
    handleAnalytics,
};

