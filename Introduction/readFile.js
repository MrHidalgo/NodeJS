const http = require("http"),
	fs = require("fs");

http.createServer(function(req, res) {
	
	fs.readFile("first.txt", "utf-8", function(err, data) {
		res.writeHead(200, {
			'Content-type' : 'text/plain'
		});
		
		if(err) {
			res.write("Could not find or open file for reading\n");
		} else {
			res.write(data);
		}
		
		res.end();
	});
	
}).listen(8124, function() {
	console.log("bound to port 8124");
});

console.log("Server running on 8124...");