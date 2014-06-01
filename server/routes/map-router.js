var express = require('express'),
    fs = require('fs'),
    exports = module.exports = {};
var homePath = process.cwd();
var router = express.Router();
router.route('/')
.get(function(req,res) {
  var file = homePath + '/server/database/judicial/geojson/america-continental.geojson';
  fs.readFile(file,function(err, data) {
    if (err) throw err;
    console.log(data);
    res.json(JSON.parse(data));
  })
});

exports.routes = router;