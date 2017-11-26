const db = require('../models');
const cheerio = require("cheerio");
const request = require("request");

module.exports = function(app) {


	app.get('/', function(req, res) {

		db.Article
			.find({})
			.then(function(dbArticle) {
				res.render('index', { data: dbArticle});
			});
	});

	app.post('/', function(req, res) {

		request('https://mynintendonews.com/', function(error, response, body) {
			if (error) throw error;

			let $ = cheerio.load(body);

			$('.entry-title').each(function() {
				let results = {
					"title": $(this).a.text(),
					"link": $(this).a.attribs.href
				}

				db.Article
					.create(results)
					.then(function(dbArticle) {
						console.log("saved to db");
					})
					.catch(function(err) {
						console.log('ERR');
					});
			});
			res.redirect('back');
			// console.log(res);
		});
	});


	// TODO: DELETE
	// app.post("/delete", (req, res) {
	// 	//code
	// });
};

