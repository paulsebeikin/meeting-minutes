'use strict'
module.exports = (sequelize, DataTypes) => {
	const Status = sequelize.define(
		'Status',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{}
	)
	Status.associate = function (models) {
		Status.hasMany(models.MeetingItem, { foreignKey: 'statusId'})
	}
	return Status
}
