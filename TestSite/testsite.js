const express = require('express'),
	handlebars = require('express-handlebars').create({
		defaultLayout: 'main'
	});
const app = express();


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

/**
 * Create path to static files
 */
app.use(express.static(__dirname + '/public'));


/* Some test */
// let fortunes = [
// 	"Some fortunes 0",
// 	"Some fortunes 1",
// 	"Some fortunes 2",
// 	"Some fortunes 3",
// 	"Some fortunes 4",
// 	"Some fortunes 5"
// ];

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

	// let randomFortune = Math.floor(Math.random() * fortunes.length);

    // response.render('about', {
     //    fortune: fortunes[randomFortune]
	// });

    response.render('about');
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
