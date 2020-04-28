'use strict'
module.exports = (sequelize, DataTypes) => {
	const MeetingType = sequelize.define(
		'MeetingType',
		{
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				valdate: {
					notEmpty: true,
				},
			},
		},
		{}
	)
	MeetingType.associate = function (models) {
		MeetingType.hasMany(models.Meeting, { foreignKey: 'meetingTypeId' })
	}
	return MeetingType
}
