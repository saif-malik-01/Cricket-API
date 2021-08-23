
const cheerio = require("cheerio");
const axios = require("axios");
const {handleUrlDB} = require('./DatabaseManager/databaseManager')
const {deleteUrl} = require('./DatabaseManager/deleteManager')

async function getHtml() {
  try {
    const {data} = await axios.get('https://www.cricbuzz.com/');
    await deleteUrl();
    await handleHtml(data);
    
  } catch (error) {
    console.error(error);
  }
}



const handleHtml = async (html) => {
 
  let matches = [];
  const setQuery = cheerio.load(html);
  const $ =  setQuery(".cb-col.cb-col-100.videos-carousal-wrapper").children().children();
  
  for (let i = 0; i < $.length; i++) {
    let history =   setQuery($[i]).children().children().children();
    let class_Name =  history[history.length -1].attribs.class;
    delete $[i].attribs.class;
    delete $[i].attribs.target;
    let [series,venue,date_time] = await getDateTime($[i].attribs.href);
    $[i].attribs.series = series;
    $[i].attribs.venue = venue;
    $[i].attribs.date_time = date_time;
    $[i].attribs.id = $[i].attribs.href.slice(21,26);

    if (/cb-text-live/.test(class_Name)){
      $[i].attribs.history = "live";
    }
    else if(/cb-text-preview/.test(class_Name)){  
      $[i].attribs.history = "overview";
    }
    else { 
      $[i].attribs.history = "past";
    }
    matches = $[i].attribs;
    
    await handleUrlDB(matches);
  }
};

const getDateTime = async (url)=>{
  const {data} = await axios.get(`https://www.cricbuzz.com/${url}`)
  const $ = cheerio.load(data);
  const splitData =  $('.cb-nav-subhdr.cb-font-12').text() ;
    const series = splitData.slice(8,/Venue/.exec(splitData).index).trim()
    const venue = splitData.slice(/Venue/.exec(splitData).index + 6,/Date/.exec(splitData).index).trim();
    const date_time = splitData.slice(/Date/.exec(splitData).index + 12,splitData.length).trim();
    return [series,venue,date_time];
}


 
 function urlTimer(){
    getHtml();
 }
 setInterval(getHtml,21600000);

 module.exports = urlTimer;