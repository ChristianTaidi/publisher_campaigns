const express = require("express");
const redis = require('redis');
const BinarySearchTree = require('binary-search-tree').BinarySearchTree;
AVLTree = require('binary-search-tree').AVLTree;
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
const data=[];
var publisherSearchTree = new BinarySearchTree();
var positionSearchTree = new BinarySearchTree();

const app = express();
const PORT = process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
    console.log(`Loading data...`)
    client.hgetall("testcampaigns#",(err,res)=>{

        

        for(value in res){
            var entry=JSON.parse(res[value])
            data.push(entry);

            if(entry.publishers == undefined){
                publisherSearchTree.insert(-1,entry.id);
            }
            if(entry.positions == undefined){
                positionSearchTree.insert(-1,entry.id);
            }

            for(publisherId in entry.publishers){
                publisherSearchTree.insert(entry.publishers[publisherId],entry.id);
            }
            for(position in entry.positions){
                positionSearchTree.insert(entry.positions[position].position,entry.id);
            }
        }
        //console.log(data);
        console.log(`---  Data Loaded  ---`)
    });
});

/**
 * GET /bid?position=XXXX&publisherid=XXXX
 */
app.get("/bid",async (req, res)=>{

    let position = req.query.position;
    let publisherId = req.query.publisherId;

    let campaigns = publisherSearchTree.search(publisherId);
    campaigns.
})