const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const UserController = require('../controllers/UserController')

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/create', verifyToken, userController.create)
userRoutes.post('/update', verifyToken, userController.update)
userRoutes.get('/login', userController.login)
userRoutes.get('/', userController.findMany)
userRoutes.delete('/delete', verifyToken, userController.delete)
userRoutes.get('/findunique', userController.findUnique)



module.exports = userRoutes