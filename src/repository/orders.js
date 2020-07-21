const knex = require('../../dataBase')
const Order = require('../models/Orders')
const orders = require('../services/orders')
const tableName = 'orders'

const getAll = async () => {
    const orders = await knex(tableName)
    return orders.map(order => new Order(order))
    
}

const getById = async (id) => {
   const [order] = await knex(tableName).where({id: id})
   return new Order(order)
}

const create = (order) => {
    return knex(tableName)
        .insert(order)
        .then(([inserted]) => inserted)
};

const update =  (id, order) => knex(tableName).where({id: id}).update(order)

module.exports = {
    getAll,
    create,
    getById,
    update,
}