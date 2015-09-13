var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Page = require('../models/page.js');
var adminUser = require('../models/admin-user.js');
var bcrypt = require('bcrypt-nodejs');

function sessionCheck(request,response,next){

    if (request.session.user) {
	 	next();
	}
    else { 
    	response.status(401).send('Authorization failed');
    }
}

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
router.post('/pages/add', sessionCheck, function(request, response) {
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
router.post('/pages/update', sessionCheck, function (request, response) {
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
router.delete('/pages/:id', sessionCheck, function(request, response) {
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

// admin user api
router.post('/add-user', function(request, response) {
    var salt, hash, password;
    password = request.body.password;
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password, salt);

    var AdminUser = new adminUser({
        username: request.body.username,
        password: hash
    });
    AdminUser.save(function(err) {
        if (!err) {
            return response.send('Admin User successfully created');

        } else {
            return response.send(err);
        }
    });
});

router.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;

	adminUser.findOne({
		username : username
	}, function(err, data) {
		if (err | data === null) {
			return response.status(401).send("User does not exist!!!!");
		} else {
			var usr = data;
			if (username == usr.username && bcrypt.compareSync(password, usr.password)) {
				request.session.regenerate(function() {
					request.session.user = username;
					return response.send(username);
				});
			} else {
				return response.status(401).send("Bad Username or Password");
			}
		}
	});
});

router.get('/logout', function(request, response) {
	// destroy session
	request.session.destroy(function() {
		return response.status(401).send("User logged out!!!");
	});
});

module.exports = router;