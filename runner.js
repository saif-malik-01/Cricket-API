const http = require('http');

const urlTimer = require("./urlFetch");
const automateTimer = require("./automate");
const trashTimer = require("./DatabaseManager/trashCollector");



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('created by saif-malik-01');
}).listen(process.env.PORT || 5000);



 function run() {
   urlTimer();
   setTimeout(automateTimer, 5000);
   setTimeout( trashTimer, 10000);
  
}
 
run();
