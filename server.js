'use strict';

let path = require('path');
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let handlebars = require('express-handlebars').create(
	{
		extname	: ".hbs",
		defaultLayout : "main",
		layoutsDir : 'app/views/layouts',
		helpers : require("./app/utils/util.js")
	});

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/Rextract", {
	useMongoClient: true
});

let app = express();

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));

app.use(express.static(__dirname + '/app/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/controllers/main.js")(app);
require('./app/controllers/notes.js')(app);


app.listen(app.get('port'), function() {
	console.log(`app listening on PORT ${app.get('port')}`);
});