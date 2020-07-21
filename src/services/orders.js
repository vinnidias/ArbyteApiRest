const repository = require('../repository/orders');
const productService = require('./products')
const Order = require('../models/Orders')
const moment = require('moment')

const getAll = () => repository.getAll();

const getById = async (id) => {
    const order = await repository.getById(id)
    if(!order){
        throw{status: 400, message: 'Not Found'}
    }
    return order
} 

const create = async (data) => {
    const order = new Order({
        ...data, 
        id: undefined, 
        created_at: undefined, 
        updated_at: undefined
    })
    const product = await productService.getById(order.product_id)
    const value = order.quantity * product.price
    const id = await repository.create({...order, value: value.toFixed(2)})
    const created = await repository.getById(id)
    return created
}

const update = async (id, data) => {
    const order = await repository.getById(id)
    if(!order.id){
        throw{status: 404, message: 'Not found'}
    }
    const merged = Object.assign({}, order, data)
    const product = await productService.getById(merged.product_id)
    const newOrder = new Order({
        ...merged, 
        id: undefined, 
        created_at: undefined,
        value: product.price * merged.quantity, 
        updated_at: moment().utc().toDate()
        })
    await repository.update(id, newOrder)
    return repository.getById(id)
}

module.exports = {
    getAll,
    create,
    getById,
    update,
}