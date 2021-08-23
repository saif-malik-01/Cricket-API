const mongoose  = require('mongoose');

const liveScoreSchema = new mongoose.Schema({
    match:Object,
})

module.exports = mongoose.model('lives',liveScoreSchema) ;