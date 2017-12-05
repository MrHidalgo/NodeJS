const http = require('http');


http.createServer(function(request, response) {
	
	let path = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	
	switch (path) {
		case "":
			response.writeHead(200, {
				"Content-type" : "text/plain"
			});
			response.end("Homepage");
			break;
		case "/about":
			response.writeHead(200, {
				"Content-type" : "text/plain"
			});
			response.end("About");
			break;
		default:
			response.writeHead(404, {
				"Content-type" : "text/plain"
			});
			response.end("Not Found");
			break;
	}
	
}).listen(3000);

console.log(`Server running on port 3000`);
