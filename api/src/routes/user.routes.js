const { Router } = require('express')

const UserController = require('../controllers/UserController')

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/create', userController.create)
userRoutes.put('/update', userController.update)
userRoutes.get('/login', userController.login)
userRoutes.get('/', userController.findMany)
userRoutes.delete('/delete', userController.delete)
userRoutes.get('/findunique', userController.findUnique)



module.exports = userRoutes