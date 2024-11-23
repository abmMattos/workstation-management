const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const ReservationController = require('../controllers/ReservationController')

const reservationRoutes = Router()

const reservationController = new ReservationController()

reservationRoutes.post('/reserveStation', verifyToken, reservationController.reserveStation)
reservationRoutes.put('/update', verifyToken, reservationController.update)
reservationRoutes.get('/', reservationController.findMany)
reservationRoutes.delete('/delete', verifyToken, reservationController.delete)
reservationRoutes.get('/findReservedByDate', verifyToken, reservationController.findReservedByDate)
reservationRoutes.get('/findReservationByUserId', verifyToken, reservationController.findReservationByUserId)


module.exports = reservationRoutes