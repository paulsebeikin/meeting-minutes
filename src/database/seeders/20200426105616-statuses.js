'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      {  name: 'Open', createdAt: new Date(), updatedAt: new Date() },
      {  name: 'In Development', createdAt: new Date(), updatedAt: new Date() },
      {  name: 'Awaiting invoice', createdAt: new Date(), updatedAt: new Date() },
      {  name: 'Closed', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};
