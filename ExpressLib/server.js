const express   = require('express'),
    bodyParser  = require('body-parser');

const app = express(),
    urlEncodedParser = bodyParser.urlencoded({
        extended: false
    });


app.use(express.static(__dirname + '/public'));


app.set('port', process.env.PORT || 3000);


app.post('/register', urlEncodedParser, (req, res) => {

    if(!req.body) {
        return res.sendStatus(400);
    }

    res.send(`${req.body.userName} - ${req.body.userAge}`);
});


app.get('/', (req, res) => {
    res.send(`<h1>Main page</h1>`)
});
app.get('/register', (req, res) => {
   res.sendFile('/register.html', {
       root: __dirname + "/public"
   });
});


app.listen(app.get('port'), () => {
    console.log(`Server start on port 3000`);
});
