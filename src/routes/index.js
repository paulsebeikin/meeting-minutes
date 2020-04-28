/**
 * This module connects API routes
 */

const router = require('express').Router()

router.use('/meetings', require('./meetings'))
router.get('/', (req, res) => {
	res.render('index')
})


// Middleware for processing Sequelize valdation errors
router.use( function(err, req, res, next) {
	switch (err.name) {
		case 'SequelizeValidationError':
		case 'SequelizeUniqueConstraintError':
		case 'BadRequest':			
			req.flash('error', err.errors)
			return res.redirect("back");
		default:
			return next(err)
	}
})

module.exports = router
