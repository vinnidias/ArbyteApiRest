const knex = require('../../dataBase');
const User = require('../models/User');
const tableName = 'users'

const create = async user => {
    const [id] = await knex(tableName).insert(user)
    return id;
};

const getOne = async params => {
    const [user] = await knex(tableName).where(params)
    return new User(user)
};

module.exports = {
    create,
    getOne,
}