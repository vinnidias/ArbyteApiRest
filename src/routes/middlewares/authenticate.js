const jwt = require('../../services/utils/jwt')
const userService = require('../../services/users')
const handleError = require('../../controller/handleError')

const authenticate = async (req, res, next) => {
    try{
        const authorization =  req.headers.authorization
        if(!authorization){
           return res.status(403).json({status: 403, message: 'Forbidden'})
        }
        const token = authorization.split(' ')[1]
        const {id} = jwt.verifyToken(token)
        
        const user = await userService.getById(id)
    
        if(!user){
            return res.status(403).json({status: 403, message: 'Forbidden'})
        }
    
        req.user = user;
        next()

    }catch(error){
        handleError(res, error)
    }
}

module.exports = authenticate