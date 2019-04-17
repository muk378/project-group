var express = require('express');
var router = express.Router();

var RepairSystem = require('../models/repairsystem');

/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('reportpage');
});

router.post('/', function (req, res, next) {

  if (req.body) {
    var repair = new RepairSystem();

    repair.repairType = req.body.repairType;
    repair.repairStatus = "ACCEPTED";
    repair.description = req.body.description;
    repair.createTime = new Date();
    repair.updateTime = new Date();
    repair.updateBy = 'room101';

    // save object
    repair.save(function (err) {
      if (err)
        throw err;
        res.render('reportpage', {isSuccess: true});
    });
  } else {
    res.render('reportpage');

  }

});

module.exports = router;
