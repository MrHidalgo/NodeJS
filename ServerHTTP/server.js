const http = require('http');

http.createServer(
    function(req, res) {
        let headerObj = req.headers;

        res.writeHead(200, {
           "Content-type" : "text/plain"
        });
        res.end("Hello server");

        console.log(`==========`);
        console.log(`Request URL: ${req.url}`);
        console.log(`Request URL: ${req.method}`);

        console.log(`==========`);
        for(let item in headerObj) {
            if(headerObj.hasOwnProperty(item)) {
                console.log(`Request headers ${item} : ${headerObj[item]}`);
            }
        }
    }
).listen(3000,
    function() {
        console.log(`Server start on port 3000`);
    }
);