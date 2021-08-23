const mongoose  = require("mongoose");
const call = require('./databaseManager');
const scoreSchema = require("./scoreSchema");
const urls = require('./urlSchema');
const Score = require('./scoreSchema')
const lives = require('./liveScoreSchema')
const details = require('./overviewSchema')

function deleteUrl(){
    urls.deleteMany({},(err,data)=>{
        if(err) console.log(err);
        console.log("deleted urls");
    })
}

function deleteScore(){
    Score.deleteMany({},(err,data)=>{
        if(err) console.log(err);
        console.log("deleted scores");
    })
}

function deleteLive(){
    lives.deleteMany({},(err,data)=>{
        if(err) console.log(err);
        console.log("deleted lives");
    })
}

function deleteOverview(){
    details.deleteMany({},(err,data)=>{
        if(err) console.log(err);
        console.log("deleted details");
    })
}


module.exports = {deleteUrl,deleteScore,deleteLive,deleteOverview};