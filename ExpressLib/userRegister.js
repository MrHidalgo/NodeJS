const express   = require('express'),
    bodyParser  = require('body-parser');

const app = express(),
    jsonParser = bodyParser.json();


app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);


app.post('/user', jsonParser, (req, res) => {
    if(!req.body) {
        return res.send(400);
    }

    console.log(`Request body: ${req.body}`);

    res.json(`${req.body.userName} - ${req.body.userAge}`);
});


app.get('/', (req, res) => {
    res.send(`<h1>Main page</h1>`);
});
app.get('/user', (req, res) => {
    res.sendFile('/userRegister.html', {
        root: __dirname + `/public`
    })
});


app.listen(app.get('port'), () => {
    console.log(`Server start on port ${app.get('port')}`);
});