const handleMatchScores = require("./liveFetch");
const Urls = require("./DatabaseManager/urlSchema");
const handleMatchDetails = require("./overview");
const { DBManager } = require("./DatabaseManager/databaseManager");
const {deleteScore} = require('./DatabaseManager/deleteManager')
const {deleteLive} = require('./DatabaseManager/deleteManager')
const {deleteOverview} = require('./DatabaseManager/deleteManager')

let pastRepeater = 0;
let overviewRepeater = 0;

async function dbConnector() {
  DBManager();
  Urls.find({}, (err, data) => {
    if (err){
      console.log(err);
      dbConnector();
    };
    reader(data);
    pastRepeater++;
    overviewRepeater++;
  });
}

function reader(data) {
  data.forEach((element) => {
    handleDate(element.history, element.href,element.id);
  });
  
}

const handleDate = (history, href,id) => {
 
  if (history == "live") handleLive(href,id);
  else if (history == "overview") handleOverview(href,id);
  else handlePast(href,id);
};

async function handleLive(href,id) {
  await deleteLive();
  handleMatchScores(href,"live",id);
}

async function handleOverview(href,id){
    if(overviewRepeater === 6 || overviewRepeater === 0){
       await deleteOverview();
        handleMatchDetails(href,id);
        overviewRepeater = 0;
    }
 
}
async function handlePast(href,id) {
    if(pastRepeater === 1080 || pastRepeater === 0){
        await deleteScore();
        handleMatchScores(href,"score",id);
        pastRepeater = 0;
    }

}



function automateTimer(){
  setInterval(dbConnector,10000);
}

module.exports = automateTimer;