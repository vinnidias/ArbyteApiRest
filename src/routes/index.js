const {Router} = require('express')
const orders = require('./orders')
const products = require('./products')

const router = new Router()

router.use(orders)
router.use(products)

router.use((req, res, next)=>{
    const err = new Error('Erro ao realizar consulta');
    err.status = 404
    next(err)
})

module.exports = router