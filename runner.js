const urlTimer = require("./urlFetch");
const automateTimer = require("./automate");
const trashTimer = require("./DatabaseManager/trashCollector");

async function run() {
   urlTimer();
   setTimeout(automateTimer, 5000);
   setTimeout( trashTimer, 10000);
  
}
 
run();