
const cheerio = require("cheerio");
const axios = require("axios");
const {handleOverviewDB} = require('./DatabaseManager/databaseManager')


const handleMatchDetails = async (url,id)=>{
    let match = {},x,y;
    const {data}  = await axios.get(`https://www.cricbuzz.com/live-cricket-scorecard/${url.slice(20)}`);
    const $ = cheerio.load(data);
    const detail = $('.cb-col.cb-col-67.cb-scrd-lft-col.html-refresh  .cb-col.cb-col-100.cb-font-13');
    let rows = $(detail[detail.length - 1]).children();
    for (let i = 0; i < rows.length; i++) {
      const element = $(rows[i]).text().trim();
      if( x = /Match\s\s/.exec(element)){
        match.title =  element.slice(5).trim();
      }
      else if( x = /Toss\s\s/.exec(element)){
        match.toss =  element.slice(7).trim();
      }
      else if( x = /Venue\s\s/.exec(element)){
        match.venue =  element.slice(5).trim();
      }
      else if( x = /Umpires\s\s/.exec(element)){
        match.umpires =  element.slice(7).trim();
      }
      else if( x = /Third Umpire\s\s/.exec(element)){
        match.umpire_3rd =  element.slice(12).trim();
      }
      else if( x = /Match Referee\s\s/.exec(element)){
        match.referee =  element.slice(13).trim();
      }
      else if( x = /Squad/.exec(element)){
        for ( let j = i+1 ; j < i+3; j++) {
          const ele = $(rows[j]).text().trim();
             if ( y = /Playing\s\s/.exec(ele)) {
               match[x.input] = {playing : ele.slice(7).trim()};
             }
             else if (y = /Bench\s\s/.exec(ele)) {
               match[x.input].bench = ele.slice(5).trim();
             }else if ( null == /Playing\s\s/.exec(ele) && j<= i+1){
                match[x.input] =  ele.trim();
             }
        }
      }
    }
    match.id = id;
    handleOverviewDB({match})
    // fs.writeFile('./data/overview.json',JSON.stringify(match),(err)=>{
    //   if (err) console.log(err);
    //   console.log("overview generated");
    // })
}




module.exports = handleMatchDetails;