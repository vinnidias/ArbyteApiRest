const { Router } = require('express')
const router = new Router()
const routerName = '/products'


//Lista todos os produtos, e será um array de produtos
router.get(routerName, (req, res) => {
    res.json([{
        message: 'Vai retornar todos os produtos'
    }])
})

//Pega os dados de um produto
router.get(`${routerName}/:id`, (req, res) => {
    res.json({
        message: 'Vai retornar os dados de um produto dado um id',
        id: req.params.id,
    })
})

//Cria um produto
router.post(routerName, (req, res) => {
    
    res.status(201).json({
        message: 'Vai criar um produto',
    })
})

//edita os dados de um produto
router.patch(`${routerName}/:id`, (req, res) => {
    res.json({
        message: 'Vai editar os dados de um produto dado um id',
        id: req.params.id,
    })
})

//delete um produto
router.delete(`${routerName}/:id`, (req,res) => res.status(204).end())
module.exports = router