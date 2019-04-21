var express = require('express');
var router = express.Router();

var fs = require('fs-extra');
var hbs = require('hbs');
var path = require('path');

// load up the user model
var RepairSystem = require('../models/repairsystem');

/* GET history page. */
router.get('/', (req, res) => {
  res.render('history', {
    title: 'History',
    repairPageActiveClass: 'active',
    isRepairingPage: true
  });
});

/* GET history datasource. */
router.get('/list', async (req, res) => {
  var query = req.query;
  var criteria = {};
  var sort = '';

  if (query.search.value) {
    var filter = new RegExp(query.search.value, 'i');
    criteria = {
      $or: [
        { repairType: filter },
        { repairStatus: filter },
        { description: filter }
      ]
    };
  }

  if (query.order.length > 0) {
    var columnName = RepairSystem.getColumnNames()[query.order[0].column];
    var dir = /asc/i.test(query.order[0].dir) ? '' : '-';
    sort = `${dir}${columnName}`;
  }

  var totalDocument = await RepairSystem.find().estimatedDocumentCount();
  RepairSystem.find(criteria)
    .sort(sort)
    .exec((error, docs) => {
      if (error) throw error;

      var result = {
        data: [],
        draw: query.draw,
        recordsTotal: 0,
        recordsFiltered: 0
      };

      if (docs && docs.length > 0) {
        result.recordsTotal = totalDocument;
        result.recordsFiltered = docs.length;

        if (query.start && query.length) {
          result.data = docs.splice(+query.start, +query.length);
        }
        result.data = result.data.map(e => e.getList());
      }

      res.json(result);
    });
});

/* POST: generate history list with template */
router.post('/list/export', async (req, res) => {
  try {
    var filePath = path.join('./', 'views', 'history-export.hbs');
    var html = await fs.readFile(filePath, 'utf-8');
    var docs = await RepairSystem.find({}).exec();
    var result = {
      data: []
    };
    if (docs && docs.length > 0) {
      result.data = docs.map(e => e.getList());
    }
    var content = await hbs.compile(html)(result);
    res.send(content);
  } catch (er) {
    console.log('blocking: ', er);
  }
});

module.exports = router;
