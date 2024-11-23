const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const StationController = require('../controllers/StationController')

const stationRoutes = Router()

const stationController = new StationController()

stationRoutes.post('/create', verifyToken(['admin']), stationController.create)
stationRoutes.post('/update', verifyToken(['admin']), stationController.update)
stationRoutes.get('/', verifyToken(['admin', 'user']), stationController.findMany)
stationRoutes.delete('/delete', verifyToken(['admin']), stationController.delete)
stationRoutes.get('/findunique', verifyToken(['admin', 'user']), stationController.findUnique)
stationRoutes.put('/block', verifyToken(['admin']), stationController.block)

module.exports = stationRoutes