/**
 * Data layer operations for the Status entity
 */

const { Status } = require('../database/models');

module.exports.getAll = () => { return Status.findAll() };

module.exports.getById = (id) => { return Status.findByPk(id) };