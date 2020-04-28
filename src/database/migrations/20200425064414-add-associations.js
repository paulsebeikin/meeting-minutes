'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        // Foreign key for MeetingType in Meeting
        queryInterface.addColumn(
          "Meetings",
          "meetingTypeId",
          {
            type: Sequelize.INTEGER,
            references : {
              model: "MeetingTypes",
              key: "id"
            },
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",      
          }, { transaction: t }
        ),
        
        // Foreign key for Meeting in MeetingItem
        queryInterface.addColumn(
          "MeetingItems",
          "meetingId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Meetings",
              key: "id"
            },
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }, { transaction: t}
        ),

        // Foreign key for Status in MeetingItem
        queryInterface.addColumn(
          "MeetingItems",
          "statusId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Statuses",
              key: "id"
            },
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }, { transaction: t}
        ),

        // Foreign key for Item in MeetingItem
        queryInterface.addColumn(
          "MeetingItems",
          "itemId",
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Items",
              key: "id"
            },
            allowNull: false,
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
          }, { transaction: t}
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Meetings", "meetingTypeId", { transaction : t }),
        queryInterface.removeColumn("MeetingItems", "meetingId", { transaction : t }),
        queryInterface.removeColumn("MeetingItems", "statusId", { transaction : t }),
        queryInterface.removeColumn("MeetingItems", "itemId", { transaction : t })
      ])
    })
  }
};
