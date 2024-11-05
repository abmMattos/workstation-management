const { Router } = require('express')

const HardwareController = require('../controllers/HardwareController')

const hardwareRoutes = Router()

const hardwareController = new HardwareController()

hardwareRoutes.post('/create', hardwareController.create)
hardwareRoutes.post('/update', hardwareController.update)
hardwareRoutes.get('/', hardwareController.findMany)
hardwareRoutes.delete('/delete', hardwareController.delete)
hardwareRoutes.get('/findunique', hardwareController.findUnique)



module.exports = hardwareRoutes