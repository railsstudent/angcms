var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminUser = new Schema({
	name: String,
	password: String	
});

adminUser = mongoose.model('adminUser', adminUser);
module.exports = adminUser;