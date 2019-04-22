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

repairSystemSchema.methods.getList = function() {
  return {
    repairType: this.repairType,
    repairStatus: this.repairStatus,
    description: this.description,
    updateBy: this.updateBy,
    createdAt: this.createdAt.toLocaleString("th-TH"),
    updatedAt: this.updatedAt.toLocaleString("th-TH")
  };
};

repairSystemSchema.statics.getColumnNames = function() {
  return [
    'repairType',
    'repairStatus',
    'description',
    'updateBy',
    'createdAt',
    'updatedAt'
  ];
};

// create the model for RepairSystem and expose it to our app
module.exports = mongoose.model('RepairSystem', repairSystemSchema);
