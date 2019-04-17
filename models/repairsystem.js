// models/repairsystem.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var repairSystemSchema = mongoose.Schema({
    repairType: String,
    repairStatus: String,
    description: String,
    createTime: Date,
    updateTime: Date,
    updateBy: String, // userName
});

// create the model for RepairSystem and expose it to our app
module.exports = mongoose.model('RepairSystem', repairSystemSchema);