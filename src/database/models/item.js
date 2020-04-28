'use strict'
module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define(
		'Item',
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Meeting item name cannot be blank"	
					}					
				},
			},
		},
		{}
	)
	Item.associate = function (models) {
		Item.hasMany(models.MeetingItem, { foreignKey: 'itemId' })
	}
	return Item
}
