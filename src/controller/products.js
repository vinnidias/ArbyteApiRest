const services = require('../services/products')
const handleError = require('./handleError')
const Product = require('../models/Product')

const getAll = (req, res) => {
    services.getAll().then(products => res.json(products))
};

const getById = (req, res) => {
  services.getById(req.params.id)
    .then((product) => res.json(product))
    .catch((err)=> handleError(res, err))
};

const create = async (req, res) => {
    try{
        const product = new Product(req.body);
        if(!product.name || !product.price){
            throw{status: 400, message: 'Invalid data'}
        }
        const created = await services.create(product)
        res.status(201).json(created)
    }catch(error){
        handleError(res, error)
    }
};

const update = (req, res) => { 
    services.update(req.params.id, req.body)
        .then((updated) => res.json(updated))
        .catch((err)=> handleError(res, err))
};

const del = (req, res) => {
    services.del(req.params.id)
        .then(()=> res.status(204).end())
        .catch((err)=> handleError(res, err))
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
}