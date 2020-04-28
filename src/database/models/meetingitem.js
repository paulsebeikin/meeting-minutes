'use strict'
module.exports = (sequelize, DataTypes) => {
	const MeetingItem = sequelize.define(
		'MeetingItem',
		{
			responsiblePerson: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Responsible person cannot be blank"
					},
				},
			},
			comment: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Comment cannot be blank"
					}
				},
			},
		},
		{}
	)
	MeetingItem.associate = function (models) {
		MeetingItem.belongsTo(models.Item, { as: 'item' })
		MeetingItem.belongsTo(models.Status, { as: 'status' })
		MeetingItem.belongsTo(models.Meeting, { as: 'meeting' })
	}
	return MeetingItem
}
