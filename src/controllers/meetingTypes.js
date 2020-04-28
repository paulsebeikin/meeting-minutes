const meetingTypesDb = require('../services/meetingTypes')

module.exports = {
	getMeetingType: (req, res, next, id) => {
		meetingTypesDb
			.getById(id)
			.then((meetingType) => {
				if (!meetingType) {
					req.flash('error', 'Meeting type not found.')
					res.redirect('/')
				} else {
					req.meetingType = meetingType
					next()
				}
			})
			.catch(next)
	},

	getMeetingTypes: (req, res, next) => {
		meetingTypesDb
			.getAll()
			.then((meetingTypes) => {
				res.render('meetings/index', { meetings: meetingTypes })
			})
			.catch(next)
	},
}
