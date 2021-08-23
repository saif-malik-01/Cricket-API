const cheerio = require("cheerio");
const axios = require("axios");
const {handleScoreDB} = require('./DatabaseManager/databaseManager')

const handleMatchScores = async (href,path,id) => {
  await axios
    .get(`https://www.cricbuzz.com/live-cricket-scorecard/${href.slice(20)}`)
    .then((data) => {
      handleHtml(data.data,path,id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleHtml = (html,path,id) => {
  const checker = /innings\w\d/;
  const $ = cheerio.load(html);
  const data = $(".cb-col.cb-col-67.cb-scrd-lft-col.html-refresh")[0];
  let final = {} , index = 1;;
  for (let i = 0; i < data.children.length ; i++) {
    let a = data.children[i].attribs ?? false;
    if ( a && checker.test(a.id)) {
       
        let b = handleInning(data.children[i], $);
        final[`inning_${index}`] = b;
        index++;
       
      }
      
  }
  final.id = id;
   
    handleScoreDB({match:final},path);
};

const handleInning = (inningData, $) => {
  const checkText = /(\w+\s\w+)|(\w+)/;
  const batting = [];
  const inning = inningData.children.filter((node, i) => $(node).text() != " ");
  const inningRows = inning[0].children.filter(
    (node, i) => $(node).text() != " "
  );
  for (let i = 2; i < inningRows.length; i++) {
    let splitData = $(inningRows[i]).text().split("   ");
    
    if (splitData.length <= 2) break;
    let playerName = splitData[1];
    let outBy = splitData[2].trim();
    let runs = splitData[splitData.length == 4 ? 3 : 4].trim();
    batting.push({ name: playerName, outBy, runs });
  }

  // first filter bowler div and then filter non empty row from bowler div
  
  const bowlingData = inning.filter((node,i)=> /Bowler/.test($(node.children[1]).text()) )[0].children.filter(
    (node, i) => $(node).text() != " "
  );
  let bowling = [];
  for (let i = 1; i < bowlingData.length; i++) {
    let splitData = $(bowlingData[i]).text().split("   ");
    if (splitData.length <= 2) break;
    let playerName = splitData[1];
    let balls = splitData[2].trim();
    bowling.push({ name: playerName, balls });
  }

  return { batting, bowling };
};

module.exports = handleMatchScores;