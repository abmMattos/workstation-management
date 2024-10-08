const { Router } = require('express')

const StationController = require('../controllers/StationController')

const stationRoutes = Router()

const stationController = new StationController()

stationRoutes.post('/create', stationController.create)
stationRoutes.put('/update', stationController.update)
stationRoutes.get('/', stationController.findMany)
stationRoutes.delete('/delete', stationController.delete)
stationRoutes.get('/findunique', stationController.findUnique)

module.exports = stationRoutes