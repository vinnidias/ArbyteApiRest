const { Router } = require('express')
const router = new Router()
const controller = require('../controller/products')
const routerName = '/products'

router.get(routerName, controller.getAll);

router.get(`${routerName}/:id`, controller.getById )

router.post(routerName, controller.create)

router.patch(`${routerName}/:id`, controller.update);

router.delete(`${routerName}/:id`, controller.del);

module.exports = router