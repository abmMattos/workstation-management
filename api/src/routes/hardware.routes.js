const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const HardwareController = require('../controllers/HardwareController')

const hardwareRoutes = Router()

const hardwareController = new HardwareController()

hardwareRoutes.post('/create', verifyToken, hardwareController.create)
hardwareRoutes.post('/update', verifyToken, hardwareController.update)
hardwareRoutes.get('/', hardwareController.findMany)
hardwareRoutes.delete('/delete', verifyToken, hardwareController.delete)
hardwareRoutes.get('/findunique', hardwareController.findUnique)



module.exports = hardwareRoutes