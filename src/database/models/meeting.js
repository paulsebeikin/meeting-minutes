'use strict'
module.exports = (sequelize, DataTypes) => {
	const Meeting = sequelize.define(
		'Meeting',
		{
			number: {
				type: DataTypes.STRING,				
				unique: true,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{}
	)	
	Meeting.associate = function (models) {
		Meeting.hasMany(models.MeetingItem, { foreignKey: 'meetingId', as : 'meetingItems' })
	}
	return Meeting
}
