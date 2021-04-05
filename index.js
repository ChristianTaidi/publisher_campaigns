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
    let publisherId = req.query.publisherId;

    try{
        let data = [];
        let bestCampaignId = 0;
        client.hgetall("testcampaigns#",(err,res)=>{
            
            for(value in res){
                data.push(JSON.parse(res[value]));
            }
            console.log(data);
            for(campaign in data){
                console.log(campaign);
                console.log(data[campaign]);
                if(data[campaign].publishers== null || data[campaign].publishers.indexOf(publisherId)!=-1){
                    if(data[bestCampaignId].cpm<data[campaign].cpm){
                        bestCampaignId=campaign;
                    }
                }
            }
        });

        
    }catch(err){
        res.status(500).send({message: err.message});
    }
})