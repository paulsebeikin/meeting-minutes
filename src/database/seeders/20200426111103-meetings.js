'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meetings', [
      {  meetingTypeId: 1, number: 'M1', date: new Date('03/04/2020'), createdAt: new Date(), updatedAt: new Date() },
      {  meetingTypeId: 2, number: 'F1', date: new Date('01/05/2020'), createdAt: new Date(), updatedAt: new Date() },
      {  meetingTypeId: 1, number: 'M2', date: new Date('12/02/2020'), createdAt: new Date(), updatedAt: new Date() },      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meetings', null, {});
  }
};
