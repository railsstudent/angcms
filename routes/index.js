var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('*', function(request, response) {
	response.fs.sendfile('./public/index.html');
});

module.exports = router;
