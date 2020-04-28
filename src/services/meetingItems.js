/**
 * Data layer operations for the MeetingItem entity
 */

const { sequelize, MeetingItem, Item, Status, Meeting } = require('../database/models')

module.exports.getAllByIds = (ids = []) => {	
	return MeetingItem.findAll({
		where: { id : ids },
		include: [
			{ model: Item, as: 'item' },
			{ model: Status, as: 'status' },
			{ model: Meeting, as: 'meeting'}
		]
	})
}

module.exports.getAll = () => {	
	return MeetingItem.findAll({		
		include: [
			{ model: Item, as: 'item' },
			{ model: Status, as: 'status' },
			{ model: Meeting, as: 'meeting'}
		]
	})
}


module.exports.getById = (id) => {
	return MeetingItem.findByPk(id, {
		include: [
			{ model: Item, as: 'item' },
			{ model: Status, as: 'status' },
		],
	})
}

// raw query which selects the most recent meeting of each meeting type
module.exports.getMeetingItemsFromLastMeetingOfEachType = () => {
	return sequelize.query('SELECT id from "MeetingItems" where "meetingId" in (SELECT Id FROM ( SELECT ROW_NUMBER() OVER (PARTITION BY "meetingTypeId" ORDER BY number desc) AS r, t.* FROM	"Meetings" t) x	WHERE x.r <= 1);')
	.then( ([results, metadata]) => {		
		return this.getAllByIds(results.map( result => result.id))
	})
}

module.exports.create = (meetingItem) => {
	return MeetingItem.create(meetingItem)
}

// creating a new meeting item so we need to first add the item then add a reference to that item in the MeetingItem table
// if the first part fails, roll back the whole transaction
module.exports.createNewMeetingItem = (meetingItem) => {
	return sequelize.transaction( t => {
		return Item.create(meetingItem.item, { transaction : t})
		.then(item => {
			meetingItem.itemId = item.id
			return MeetingItem.create(meetingItem, { transaction: t})		
		})
		.catch(err => {			
			throw err;
		})
	})
}

module.exports.update = (meetingItem) => {
	return meetingItem.save()
}
