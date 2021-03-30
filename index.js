const express = require("express");
const redis = require('redis');

/**
 * Redis client init
 */
const client = redis.createClient();
client.on("error", (err)=>{
    console.log(err);
});

/**
 * Web server init
 */
const app = express();
const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});

/**
 * GET /bid?position=XXXX&publisherid=XXXX
 */
app.get("/bid",async (req, res)=>{

    let position = req.query.position;
    let publisherId = req.query.publisherid;

    try{
        client.hgetall("testcampaigns#",(err,res)=>{
            let data = [];
            for(value in res){
                data.push(JSON.parse(res[value]));
            }
            console.log(data);
        })
    }catch(err){
        res.status(500).send({message: err.message});
    }
})