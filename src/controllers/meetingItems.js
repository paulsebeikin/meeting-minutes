const meetingItemsDb = require('../services/meetingItems')
const itemsDb = require('../services/items')
const statusesDb = require('../services/statuses')

module.exports = {
	getMeetingItems: (req, res, next) => {
		meetingItemsDb
			.getAll()
			.then((meetingItems) => {
				res.render('meetingItems/index', { meeting: req.meeting, meetingItems: meetingItems })
			})
			.catch(next)
	},

	getMeetingItem: (req, res, next, id) => {
		meetingItemsDb.getById(id).then(meetingItem => {
			req.meetingItem = meetingItem
			next()
		})
		.catch(next)
	},		

	createMeetingItem: (req, res, next) => {
		req.body.meetingItem.meetingId = req.meeting.id			
		meetingItemsDb.createNewMeetingItem(req.body.meetingItem)
		.then(meetingItem => {			
			req.flash('success', 'Successfully created meeting item.')
			res.redirect(`/meetings/${ meetingItem.meetingId }`)
		})
		.catch(next)	
	},

	showMeetingItem: (req, res, next) => {
		statusesDb.getAll().then(statuses => {						
			res.render('meetingItems/edit', { meetingItem : req.meetingItem, statuses : statuses })
		})		
		.catch(next)
	},

	newMeetingItem: (req, res, next) => {	
		statusesDb.getAll().then(statuses => {
			res.render('meetingItems/new', { meeting : req.meeting, statuses : statuses })
		})	
		.catch(next)	
	},

	updateMeetingItem: (req, res, next) => {		

		if (req.body.meetingItem.statusId !== 'undefined'){
			req.meetingItem.statusId = req.body.meetingItem.statusId
		}

		if (req.body.meetingItem.comment !== 'undefined'){
			req.meetingItem.comment = req.body.meetingItem.comment
		}

		if (req.body.meetingItem.responsiblePerson !== 'undefined'){
			req.meetingItem.responsiblePerson = req.body.meetingItem.responsiblePerson
		}

		meetingItemsDb.update(req.meetingItem).then(() => {
			req.flash('success', 'Successfully updated meeting item.')
			res.redirect(`/meetings/${req.meetingItem.meetingId}`)
		})
		.catch(next)
	}
}
