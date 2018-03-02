'use strict'

//set up server for app with express, handlebars, and mongoose
let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let handlebars = require('express-handlebars').create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: 'app/views/layouts',
  helpers: require('./app/utils/util.js')})
let mongoose = require('mongoose')
let db = require('./app/models')
let app = express()

//parse, log, and use static
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(express.static(path.join(__dirname, '/app/public')))

//create connection to MongoDB
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/Rextract', {
  useMongoClient: true
})

//set handlebars view engine
app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'app/views'))

//routes
require('./app/controllers/main.js')(app)
require('./app/controllers/notes.js')(app)

app.listen(app.get('port'), function () {
  console.log(`app listening on PORT ${app.get('port')}`)
})
