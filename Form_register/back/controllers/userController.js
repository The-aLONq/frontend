const ApiError = require('../error/ApiError')
const{User} = require('../models/models')



class UserController {
    async regestration(req,res, next){
        const {name, email, password} = req.body
        const candidate = await User.findOne({where: {email}})// проверка на одинаковую почту в бд
        if (candidate) {
            return next(ApiError.badRequest(console.log('alert')))
        }
        const user = await User.create({name,email,password})//создание пользователя
        return res.json({name,email,password})
    }

    async login(req,res, next){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        const parol = await User.findOne({where:{password}})
        if(!user) {
            return next(ApiError.internal('Пользователь не найден!'))
        }
        if (!parol) {
            return next(ApiError.internal('Пароль не верный!'))
        }
        return res.json('Приветствую!')
    }
    
}

module.exports = new UserController()



        


            