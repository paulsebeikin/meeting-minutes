const meetingsDb = require('../services/meetings')
const meetingTypesDb = require('../services/meetingTypes')
const meetingItemsDb = require('../services/meetingItems')
const { BadRequest } = require('../errors')

module.exports = {
	showMeeting: (req, res, next) => {
		meetingsDb
			.getAll()
			.then((meetings) => {
				res.render('meetings/show', { meetings: meetings, selectedMeeting: req.meeting })
			})
			.catch(next)
	},

	getMeeting: (req, res, next, id) => {
		meetingsDb
			.getById(id)
			.then((meeting) => {
				req.meeting = meeting
				next()
			})
			.catch(next)
	},

	getMeetings: (req, res, next) => {
		meetingsDb
			.getAll()
			.then((meetings) => {
				res.render('meetings/index', { meetings: meetings })
			})
			.catch(next)
	},

	newMeeting: (req, res, next) => {
		Promise.all([meetingTypesDb.getAll(), meetingItemsDb.getMeetingItemsFromLastMeetingOfEachType()]).then((results) => {
			const meetingTypes = results[0]
			const meetingItems = results[1]
			res.render('meetings/new', { meetingTypes: meetingTypes, meetingItems : meetingItems })
		})
		.catch(next)
	},

	addMeeting: (req, res, next) => {		

		if(!Date.parse(req.body.meeting.date)){
			throw new BadRequest("Date is a required field", 400) 
		}
		
		if (req.body.meeting.meetingTypeId === "-1"){			
			throw new BadRequest("Meeting type is a required field", 400) 
		}
		else {
			Promise.all([
				meetingsDb.getCountByType(req.body.meeting.meetingTypeId),
				meetingTypesDb.getById(req.body.meeting.meetingTypeId),
				meetingItemsDb.getAllByIds(req.body.meeting.items)
			])
				.then((results) => {
					const cnt = results[0]
					const type = results[1].type
					const items = results[2]
					req.body.meeting.number = `${type.substring(0, 1).toUpperCase()}${cnt + 1}`								
	
					meetingsDb.create(req.body.meeting).then((meeting) => {
	
						if(items.length > 0){
							
							items.forEach(item => { 
								
								const newItem = {
									responsiblePerson:  item.responsiblePerson,
									itemId: item.itemId,
									statusId: item.statusId,
									meetingId: meeting.id,
									comment: item.comment
								}							
								meetingItemsDb.create(newItem)
							})
						}
	
						req.flash('success', 'Successfully created meeting.')
						res.redirect('/meetings')
					})
				})
				.catch(next)
		}		
	},
}