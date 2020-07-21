const { Router } = require('express')
const router = new Router()
const controller = require('../controller/orders')
const routerName = '/orders'

//Lista todos os produtos, e será um array de produtos
router.get(routerName, controller.getAll)

//Pega os dados de um produto
router.get(`${routerName}/:id`, controller.getById)

//Cria um produto
router.post(routerName, controller.create)

//edita os dados de um produto
router.patch(`${routerName}/:id`, controller.update)

//delete um produto
router.delete(`${routerName}/:id`, (req,res) => res.status(204).end())
module.exports = router