const http = require("http"),
	fs = require("fs");

/**
 * @name hadError
 * @function
 *
 * @param err
 * @param response
 */
hadError = (err, response) => {
	console.log(`Error: ${err}`);
	response.end("Server error...");
};

/**
 * @name formatHTML
 * @function
 *
 * @param title
 * @param template
 * @param response
 *
 * @description Receives headers and a template, and then passes the response back to the client
 */
formatHTML = (title, template, response) => {
	let html = template.replace('%', title.join('</li><li>'));
	
	response.writeHead(200, {
		"Content-type" : "text/html"
	});
	response.end(html);
};

/**
 * @name getTemplate
 * @function
 *
 * @param title
 * @param response
 *
 * @description Loads a template file
 */
getTemplate = (title, response) => {
	fs.readFile('./index.html', function (err, data) {
		
		if(err) return hadError(err, response);
		
		formatHTML(title, data.toString(), response);
	});
};

/**
 * @name getTitles
 * @function
 *
 * @param response
 *
 * @description Extracts headers
 */
getTitles = (response) => {
	fs.readFile('./data.json', function(err, data) {
		
		if (err) return hadError(err, response);
		
		getTemplate(JSON.parse(data.toString()), response);
	});
};

/**
 * Create server
 */
http.createServer(function(request, response) {
	getTitles(response);
}).listen(3000, () => {
	console.log("Server listener port 3000.");
});
