const lives = require('./liveScoreSchema');
const details = require('./overviewSchema');
const Score = require('./scoreSchema');
const urls = require('./urlSchema')
const call = require('./databaseManager')

async function trashCollector(){
    const past =  await Score.find({});
    const live =  await lives.find({}); 
    const detail =  await details.find({}); 
    const data = await Promise.all([past,live,detail]);
    handleData(data[0],data[1],data[2]);
 
}



function handleData(past,live,overview){
    let message =0;
    for (let i = 0; i < live.length; i++) {
        for (let j = 0; j < past.length; j++) {
            if(live[i].match.id === past[j].match.id){
                lives.deleteOne({_id:`${live[i]._id}`},(err)=>{
                    if(err) console.log(err);
                })
            }else message++;
        }
    }
    for (let i = 0; i < overview.length; i++) {
        for (let j = 0; j < live.length; j++) {
            if(overview[i].match.id === live[j].match.id){
                details.deleteOne({_id:`${overview[i]._id}`},(err)=>{
                    if(err) console.log(err);
                })
            }else message++;
        }
    }
    for (let i = 0; i < overview.length; i++) {
        for (let j = 0; j < past.length; j++) {
            if(overview[i].match.id === past[j].match.id){
                details.deleteOne({_id:`${overview[i]._id}`},(err)=>{
                    if(err) console.log(err);
                })
            }else message++;
        }
    }
    if(message==0) console.log("nothing to delete");
    else  console.log("deleted");
}


function trashTimer(){
    setInterval(trashCollector,10000);
}

module.exports = trashTimer;