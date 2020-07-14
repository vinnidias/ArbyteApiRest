const { Router } = require('express')
const router = new Router()
const knex = require('../../dataBase/index')
const controller = require('../controller/products')
const routerName = '/products'
const tableName = 'products'

router.get(routerName, controller.getAll);


router.get(`${routerName}/:id`, controller.getById )

router.post(routerName, controller.create)

router.patch(`${routerName}/:id`, async (req, res) => {
    try{
        const [found] = await knex(tableName).where({id: req.params.id});
        if(!found){
            const err = Error('Not found');
            err.status= 404;
            throw err;
        }
        const updated = await knex(tableName)
            .where({id: req.params.id})
            .update(req.body)
        res.json(updated)
   }catch(err){
        res.status(err.status || 500).json({message: err.message})
   }
})


router.delete(`${routerName}/:id`, controller.del);

module.exports = router