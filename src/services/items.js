/**
 * Data layer operations for the Item entity
 */

const { Item } = require('../database/models');

module.exports.getAll = () => { return Item.findAll() };

module.exports.getById = (id) => { return Item.findByPk(id) };

module.exports.create = (item) => { return Item.create(item) };