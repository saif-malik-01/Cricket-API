const mongoose  = require('mongoose');

const urlSchema = new mongoose.Schema({
    title:String,
    href:String,
    series:String,
    venue:String,
    date_time:String,
    id:String,
    history:String
})

module.exports = mongoose.model('urls',urlSchema) ;