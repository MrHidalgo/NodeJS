const app       = require('express')(),
    http        = require('http').Server(app),
    mysql       = require('mysql'),
    bodyParser  = require('body-parser');

/**
 *
 * @type {Connection}
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: ''
});

/**
 *
 */
app.use(bodyParser.urlencoded({
    extended: false
}));

/**
 *
 */
app.use(bodyParser.json());

/**
 *
 */
app.get('/', (req, res) => {
    res.json("Welcome to the page...");
});

/**
 *
 */
app.get('/city', (req, res) => {

    connection.query('SELECT Code, Name, GovernmentForm, HeadOfState FROM world.country', (err, data) => {
        if(err) throw err;

        res.send(data);
    })

});

/**
 *
 */
http.listen(4000,function(){
    console.log("Connected & Listen to port 3000");
});
