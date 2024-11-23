const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const HardwareController = require('../controllers/HardwareController')

const hardwareRoutes = Router()

const hardwareController = new HardwareController()

hardwareRoutes.post('/create', verifyToken(['admin']), hardwareController.create)
hardwareRoutes.post('/update', verifyToken(['admin']), hardwareController.update)
hardwareRoutes.get('/', verifyToken(['admin', 'user']), hardwareController.findMany)
hardwareRoutes.delete('/delete', verifyToken(['admin']), hardwareController.delete)
hardwareRoutes.get('/findunique', verifyToken(['admin', 'user']), hardwareController.findUnique)



module.exports = hardwareRoutes