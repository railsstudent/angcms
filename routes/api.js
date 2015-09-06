var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Page = require('../models/page.js');
var adminUser = require('../models/admin-user.js');

/* User Routes. */
router.get('/', function(req, res) {
	res.send('Welcome to the API zone');
});

router.get('/pages', function(request, response) {
	return Page.find(function(err, pages) {
		if (!err) {
			// success
			return response.send(pages);
		} else {
			// failure
			return response.send(500, err);
		}
	});
});

module.exports = router;