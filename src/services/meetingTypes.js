/**
 * Data layer operations for the MeetingType entity
 */

const { MeetingType } = require('../database/models')

module.exports.getAll = () => {
	return MeetingType.findAll()
}

module.exports.getById = (id) => {
	return MeetingType.findByPk(id)
}

module.exports.create = (meetingType) => {
	return MeetingType.create({ type: meetingType.type })
}