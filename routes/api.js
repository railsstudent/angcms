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

// create post
router.post('/pages/add', function(request, response) {
	var page = new Page({
		title: request.body.title,
		url: request.body.url,
		content: request.body.content,
		menuIndex: request.body.menuIndex,
		date: new Date(Date.now())
	});

	page.save(function(err) {
		if (!err) {
			return response.status(200).send(page);
		} else {
			return response.status(500).send(err);
		}
	});
});

// update post. I will use put instead
router.post('/pages/update', function (request, response) {
	var id = request.body._id;

	Page.update({
		_id: id
	}, {
		$set: {
			title : request.body.title,
			url: request.body.url,
			content: request.body.content,
			menuIndex: request.body.menuIndex,
			date: new Date(Date.now()) 
		}
	}).exec();
	response.send("Page updated");
});

// delete post
router.delete('/pages/:id', function(request, response) {
	var id = request.params.id;
	Page.remove({
		_id: id
	}, function(err) {
		return console.log(err);
	});
	return response.send('Page id- ' + id + ' has been deleted');
});

router.get('/pages/admin-details/:id', function(request, response) {
	var id = request.params.id;
	Page.findOne({
		_id : id
	}, function(err, page) {
		if (err) {
			return console.log(err);
		} else {
			return response.send(page);
		}
	});
});

// we will use the URL as a parameter to fetch the data
// like our frontend to show SEO-friendly URLs
router.get('/pages/details/:url', function(request, response) {
	var url = request.params.url;
	Page.findOne({
		url: url
	}, function(err, page) {
		if (err) {
			return console.log(err);
		} else {
			response.send(page);
		}
	});
});

module.exports = router;