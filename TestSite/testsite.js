const express = require('express'),
	handlebars = require('express-handlebars').create({
		defaultLayout: 'main'
	});

const app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

/**
 * Home page
 */
app.get('/', (request, response) => {
	response.type('text/plain');
	response.send("Home page site");
});

/**
 * About page
 */
app.get('/about', (request, response) => {
	response.type('text/plain');
	response.send("About site");
});

/**
 * User page 404
 */
app.use((request, response) => {
	response.type('text/plain');
	response.status(404);
	response.send('404 - Not Found');
});

/**
 * User page 500
 */
app.use((request, response) => {
	response.type('text/plain');
	response.status(500);
	response.send('500 - Server Error');
});

/**
 * Start to listen port 3000
 */
app.listen(app.get('port'), () => {
	console.log(`Server running on port http://localhost:${app.get('port')}`);
});
