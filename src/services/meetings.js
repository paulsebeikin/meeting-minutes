/**
 * Data layer operations for the Meeting entity
 */

const { Meeting, MeetingItem, Item, Status } = require('../database/models')


module.exports.getAll = () => {
	return Meeting.findAll({
		include: { model: MeetingItem, as: 'meetingItems', include: { model: Item, as: 'item' } },
	})
}

module.exports.getById = (id) => {
	return Meeting.findByPk(id, {
		include: {
			model: MeetingItem,
			as: 'meetingItems',
			include: [{ model: Item, as: 'item' }, { model: Status, as: 'status' }]
		},
	})
}

module.exports.create = (meeting) => {
	return Meeting.create(meeting)
}

module.exports.getCountByType = (id) => {
	return Meeting.count({ where: { meetingTypeId: id } })
}
