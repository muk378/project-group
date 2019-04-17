var express = require('express');
var router = express.Router();

var RepairSystem = require('../models/repairsystem');

/* GET contact page. */
router.get('/', function (req, res, next) {
  res.render('reportpage');
});

router.post('/', function (req, res, next) {
  console.log('params: ', req.params);
  if (req.params) {
    var repair = new RepairSystem();

    // repair.repairType =
    //   repair.repairStatus:
    // repair.description:
    // repair.createTime:
    // repair.updateTime:
    // repair.updateBy:  // userName

    // save the user
    // repair.save(function (err) {
    //   if (err)
    //     throw err;
    //   return done(null, repair);
    // });
  }

  res.render('reportpage');
});

module.exports = router;
