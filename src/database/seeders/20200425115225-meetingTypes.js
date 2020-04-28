'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MeetingTypes', [
      {  type: 'MANCO', createdAt: new Date(), updatedAt: new Date() },
      {  type: 'Finance', createdAt: new Date(), updatedAt: new Date() },
      {  type: 'Project Team Leaders (PTL)', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MeetingTypes', null, {});
  }
};
