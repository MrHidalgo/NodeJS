// module.exports = exports = this
var db = require('./db');
db.connect();

var log = require('./logger')(module);

var User = require('./user');

function run() {
	var vasya = new User("Vasya");
	var petya = new User("Petya");
	
	vasya.hello(petya);
	
	log(db.getPhrase("Run successful"));
}

if(module.parent) {
	// if require file
	exports.run = run;
} else {
	run();
}

console.log(module);