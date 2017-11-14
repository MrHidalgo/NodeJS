// export -> object
// global ->  global variable

var db = require('../db');
var log = require('../logger')(module);


function User(name) {
	this.name = name;
}

User.prototype.hello = function(who) {
	log(db.getPhrase("Hello") + ", " + who.name);
};

module.exports = User;
// exports.User = User;
// global.User = User; -> bad idea

// console.log(module);