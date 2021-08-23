const mongoose = require('mongoose');
const Urls = require('./urlSchema')
const Score = require('./scoreSchema')
const Live = require('./liveScoreSchema')
const details = require('./overviewSchema')
const url = 'mongodb+srv://saif:pcvirus0@test.yjqub.mongodb.net/Cricket-API?retryWrites=true&w=majority';

function call(){
    console.log("connection repeat");
}

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("DB connected"))
.catch((err)=>console.log(err))


async function handleUrlDB(url){
    const urls = new Urls(url)
    await urls.save().then((url)=>console.log("Uploaded!"))
    .catch((err)=>console.log(err))
}

async function handleOverviewDB(url){
    const Details = new details(url)
    await Details.save().then((url)=>console.log("Uploaded! overview"))
    .catch((err)=>console.log(err))
}

async function handleScoreDB(score,collection){
    if(collection == "live"){
        console.log("live......");
        const liveScores = new Live(score)
        await liveScores.save().then((liveScore)=>console.log("live Uploaded!"))
       .catch((err)=>console.log(err))
    }else{
        const scores = new Score(score)
        await scores.save().then((score)=>console.log("past Uploaded!"))
       .catch((err)=>console.log(err))
    }
}

module.exports = {handleUrlDB,DBManager:call,handleScoreDB,handleOverviewDB};