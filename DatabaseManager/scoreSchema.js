const mongoose  = require('mongoose');

const scoreSchema = new mongoose.Schema({
    match:Object,
})

module.exports = mongoose.model('Score',scoreSchema) ;