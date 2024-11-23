const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const StationController = require('../controllers/StationController')

const stationRoutes = Router()

const stationController = new StationController()

stationRoutes.post('/create', verifyToken, stationController.create)
stationRoutes.post('/update', verifyToken, stationController.update)
stationRoutes.get('/', stationController.findMany)
stationRoutes.delete('/delete', verifyToken, stationController.delete)
stationRoutes.get('/findunique', stationController.findUnique)
stationRoutes.put('/block', verifyToken, stationController.block)

module.exports = stationRoutes