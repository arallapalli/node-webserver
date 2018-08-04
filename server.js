const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.get('/', (request, response) => {
	response.send('<h1>Hello Express!</h1>');
	// response.send({
	// 	name: 'AR',
	// 	likes: [
	// 		'Biking',
	// 		'Travel',
	// 		'Music'
	// 	]
	// });
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	})

});

app.get('/projects', (request, response) => {
	response.render('projects.hbs', {
		pageTitle: 'Projects',
		currentYear: new Date().getFullYear()
	})

});

// /bad
app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to handle request'
	});
});
app.listen(port, () => {
	console.log(`Server started on ${port}`);
});
