const fs = require("fs");

fs.readFile('./TextFile/resource.json', (err, data) => {

	if(err) throw err;
	
	console.log(data);
	console.log(data.toString());
});