var express = require('express');
var router = express.Router();
// load up the user model
var RepairSystem = require('../models/repairsystem');

/* GET history page. */
router.get('/', function(req, res, next) {
  res.render('history', {
    title: 'History',
    repairPageActiveClass: 'active',
    isRepairingPage: true
  });
});

/* GET history datasource. */
router.get('/list', function(req, res, next) {
  RepairSystem.find((error, docs) => {
    if (error) throw error;
    var result = [];
    if (docs && docs.length > 0) {
      result = docs.map((e) => e.getList());
    }
    res.json([...result]);
  });
});

module.exports = router;
