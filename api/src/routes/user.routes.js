const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const UserController = require('../controllers/UserController')

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/create', verifyToken(['admin']), userController.create)
userRoutes.post('/update', verifyToken(['admin']), userController.update)
userRoutes.get('/login', userController.login)
userRoutes.get('/', verifyToken(['admin', 'user']), userController.findMany)
userRoutes.delete('/delete', verifyToken(['admin']), userController.delete)
userRoutes.get('/findunique', verifyToken(['admin', 'user']), userController.findUnique)



module.exports = userRoutes