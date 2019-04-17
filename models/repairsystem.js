// models/repairsystem.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var repairSystemSchema = new mongoose.Schema(
  {
    repairType: String,
    repairStatus: String,
    description: String,   
    updateBy: String
  },
  {
    timestamps: true
  }
);

// create the model for RepairSystem and expose it to our app
module.exports = mongoose.model('RepairSystem', repairSystemSchema);
