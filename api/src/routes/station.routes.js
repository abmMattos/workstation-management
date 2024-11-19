const { Router } = require('express')

const StationController = require('../controllers/StationController')

const stationRoutes = Router()

const stationController = new StationController()

stationRoutes.post('/create', stationController.create)
stationRoutes.post('/update', stationController.update)
stationRoutes.get('/', stationController.findMany)
stationRoutes.delete('/delete', stationController.delete)
stationRoutes.get('/findunique', stationController.findUnique)
stationRoutes.put('/block', stationController.block)

module.exports = stationRoutes