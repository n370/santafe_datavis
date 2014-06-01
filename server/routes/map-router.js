var express = require(express),
    router = express.Router(),
    exports = module.exports = {};

exports.routes = router.route('/')
  .get(function(req,res) {
    var file = __dirname + '/database/judicial/geojson/america-continental.geojson';
    fs.readFile(file,function(err, data) {
      if (err) throw err;
      console.log(data);
      res.json(JSON.parse(data));
    })
  });