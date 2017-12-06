const express = require('express'),
	handlebars = require('express-handlebars').create({
		defaultLayout: 'main'
	});

const fortune = require('./lib/fortune');

const app = express();


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

/**
 * Create path to static files
 */
app.use(express.static(__dirname + '/public'));


/**
 * Home page
 */
app.get('/', (request, response) => {
	// response.type('text/plain');
	// response.send("Home page site");
	response.render('home');
});
/**
 * About page
 */
app.get('/about', (request, response) => {
	// response.type('text/plain');
	// response.send("About site");

    response.render('about', {
        fortune: fortune.getFortune()
	});
});


/**
 * User page 404
 */
app.use((request, response) => {
	// response.type('text/plain');
	response.status(404);
	// response.send('404 - Not Found');
    response.render('404');
});
/**
 * User page 500
 */
app.use((request, response) => {
	// response.type('text/plain');
	response.status(500);
	// response.send('500 - Server Error');
    response.render('500');
});


/**
 * Start to listen port 3000
 */
app.listen(app.get('port'), () => {
	console.log(`Server running on port http://localhost:${app.get('port')}`);
});
