const http = require("http"),
	fs = require("fs"),
	path = require("path"),
	mime = require("mime");


let cache = {};

/**
 * Return 404 error if get resource is not found
 *
 * @name send404
 * @function
 *
 * @param response
 */
send404 = (response) => {
	response.writeHead(
		404, {
		"Content-type" : "text/plain"
	});
	response.write(`Error 404: resource not found!`);
	response.end();
};


/**
 * Write to file HTTP header and then send file contents
 *
 * @name sendFile
 * @function
 *
 * @param response
 * @param filePath
 * @param fileContents
 */
sendFile = (response, filePath, fileContents) => {
	response.writeHead(
		200, {
		"Content-type" : mime.getType(path.basename(filePath))
	});
	response.end(fileContents);
};


/**
 * Check if files is cached
 *
 * @name serveStatic
 * @function
 *
 * @param response
 * @param cache
 * @param absPath
 */
serveStatic = (response, cache, absPath) => {
	/**
	 * If file cache in memory
	 */
	if(cache[absPath]) {
		/**
		 * Service file from memory
		 */
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, (exists) => {
			if (exists) {
				fs.readFile(absPath, (err, data) => {
					if(err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
};


/**
 * Create simple HTTP server
 *
 * @name server
 * @function
 *
 * @description
 */
let server = http.createServer((request, response) => {
	
	let filePath = false;
	
	if(request.url === "/") {
		filePath = "public/index.html";
	} else {
		filePath = "public" + request.url;
	}
	
	let absPath = "./" + filePath;
	
	serveStatic(response, cache, absPath);
});


/**
 * @description run HTTP server on port 3000
 */
server.listen(3000, () => {
	console.log("Server listener port 3000.");
});