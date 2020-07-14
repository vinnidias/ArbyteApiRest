const services = require('../services/products')

const getAll = (req, res) => {
    services.getAll().then(products => res.json(products))
};

const getById = (req, res) => {
  services.getById(req.params.id)
    .then((product) => res.json(product))
};

const create = (req, res) => {
   services.create(req.body).then(created => res.status(201).json(created))
};

const del = (req, res) => {
    services.del(req.params.id).then(()=> res.status(204).end());
};

module.exports = {
    getAll,
    getById,
    create,
    del,
}