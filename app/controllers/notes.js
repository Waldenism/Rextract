let db = require('../models');

module.exports = function(app) {

	app.get('/notes/:id', function(req, res) {

		db.Article.find({'_id': req.params.id })
		.populate("notes")
		.then((dbArticle) => {
			console.log(dbArticle);
			res.render('note', {data: dbArticle[0]})
			//res.json(dbArticle[0]);
		})
		.catch((err) => {
			res.json(err);
		});

	});

	app.post('/notes/id', (req, res) => {

		db.Note
			.create({'text': req.body.note })
			.then((dbNote) => {
				return db.Article.findOneAndUpdate(
					{_id: req.params.id},
					{ $set: {note: dbNote._id}}, {new: true}
				);
			})
			.then((dbArticle) => {
				console.log("success!");
			})
			.catch((err) => {
				res.json(err);
			});
	});
};