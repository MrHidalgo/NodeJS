const http = require("http");

const option = {
	host: 'localhost',
	port: 8124,
	path: '/?file=second',
	method: 'GET'
};

let processPublicTimeline = function(response) {
	console.log("GET finis");
};

for(let i = 0; i < 2000; i++) {
	http.request(option, processPublicTimeline).end();
}