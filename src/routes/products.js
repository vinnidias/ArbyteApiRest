const { Router } = require('express')
const router = new Router()
const knex = require('../dataBase/index')

const routerName = '/products'
const tableName = 'products'

router.get(routerName, (req, res) => {
    knex(tableName)
        .then(result=> res.json(result))
    
})


router.get(`${routerName}/:id`, (req, res) => {
  knex(tableName)
    .where({id: req.params.id})
    .then(([found])=>{res.json(found)})
})

router.post(routerName, (req, res) => {
    knex(tableName)
        .insert(req.body)
            .then(([inserted]) => res.status(201).json(inserted))
})

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


router.delete(`${routerName}/:id`, (req,res) => {
    knex(tableName)
        .where({id: req.params.id})
        .del()
        .then(()=> res.status(204).end())
    })
module.exports = router