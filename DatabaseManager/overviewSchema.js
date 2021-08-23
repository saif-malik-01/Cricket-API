const mongoose  = require('mongoose');

const overviewSchema = new mongoose.Schema({
    match:Object,
})

module.exports = mongoose.model('details',overviewSchema) ;