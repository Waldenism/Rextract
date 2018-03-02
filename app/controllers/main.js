const db = require('../models')
const cheerio = require('cheerio')
const request = require('request')

module.exports = function (app) {

  app.get('/', function (req, res) {
    db.Article
      .find({})
      .then(function (dbArticle) {
        res.render('index', {data: dbArticle})
      })
  })

  app.post('/', function (req, res) {
    request('https://mynintendonews.com/', function (error, response, body) {
      if (error) throw error

      let $ = cheerio.load(body)

      let results = []

      $('.entry-title').each(function(i, element) {
        let title = $(element).text()

        let link = $(element).children().attr('href')

        results.push({
          title: title,
          link: link
        })
      })

      // console.log(results)

      db.Article
        .create(results)
        .then(function(dbArticle) {
          console.log('saved to db')
        })
        .catch(function (err) {
          console.log('ERR')
        })

      res.redirect('back')
    })// close request
  })// close post

  app.post("/delete", function(req, res) {
  	console.log(req.body.id)
  })
}
