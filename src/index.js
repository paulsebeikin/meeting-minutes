/**
 * This is the starting point for the application
 */

const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()

app.set('views', 'src/views')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(flash())

app.use(
	require('express-session')({
		secret: "Life is like a box of chocolates - you just don't know what you're gonna get",
		resave: false,
		saveUninitialized: false,
	})
)

// Locals
app.use((req, res, next) => {
 res.locals.errors = req.flash('error'),
 res.locals.success = req.flash('success'),
 res.locals.currentUrl = req.url
 next()
})

app.use('/', routes)

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send(err)
})

module.exports = app
