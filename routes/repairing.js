var express = require('express');
var router = express.Router();

var RepairSystem = require('../models/repairsystem');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('repairing', {
    title: 'Repairing Online',
    repairPageActiveClass: 'active'
  });
});

router.post('/', function(req, res, next) {
  if (req.body) {
    var repair = new RepairSystem();

    repair.repairType = req.body.repairType;
    repair.repairStatus = 'ACCEPTED';
    repair.description = req.body.description;
    repair.updateBy = req.user ? req.user.userName : 'System';

    // save object
    repair.save(function(err) {
      if (err) throw err;
      res.render('repairing', { isSuccess: true });
    });
  } else {
    res.render('repairing');
  }
});

module.exports = router;
