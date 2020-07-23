const User = require('../models/User')
const repository = require('../repository/users')
const {encryptPassword} = require('./utils/encrypt')

const create = async (data) => {
    const user = new User({
        ...data,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
    })

    const {salt , encryptedPassword: password} = encryptPassword(data.password);

    const id = await repository.create({...user, password, salt})
    
    const created = await repository.getOne({id: id})
    return created.view();
};

const login = async (loginData) => {
    try{
        const user = await repository.getOne({email: loginData.email})
        if(!user){
            throw{ status: 401, message: 'Not authorized' }
        }
        const {encryptedPassword} = encryptPassword(loginData.password, user.salt)
        if(encryptedPassword !== user.password){
            throw{ status: 401, message: 'Not authorized' }
        }
    }catch(error){

    }
}

module.exports = {
    create,
    login, 
}