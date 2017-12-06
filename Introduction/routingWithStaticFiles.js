const http = require('http'),
	fs = require('fs');

/**
 *
 * @param response
 * @param path
 */
function hadError(response, path) {
	response.writeHead(404, {
		"Content-type" : "text/plain"
	});
	response.end(path)
}

/**
 *
 * @param response
 * @param contentType
 * @param data
 */
function hadDone(response, contentType, data) {
	response.writeHead(200, {
		"Content-type": contentType
	});
	response.end(data);
}

/**
 *
 * @param response
 * @param path
 * @param contentType
 */
function serveStaticFile (response, path, contentType) {
	fs.readFile(__dirname + path, function (err, data) {
		if(err) {
			hadError(response, path);
		}
		
		hadDone(response, contentType, data);
	});
}

/**
 *
 */
http.createServer(function (request, response) {
	
	let path = request.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	
	switch (path) {
		case "":
			serveStaticFile(response, '/public/index.html', 'text/html');
			break;
		case "/about":
			serveStaticFile(response, '/public/about.html', 'text/html');
			break;
		case "/image/logo.png":
			serveStaticFile(response, '/public/image/logo.png', 'image/png');
			break;
		case "/image/404.png":
			serveStaticFile(response, '/public/image/404.png', 'image/png');
			break;
		default:
			serveStaticFile(response, '/public/404.html', 'text/html');
			break;
	}
	
}).listen(3000);


console.log(`Server running on port 3000`);
