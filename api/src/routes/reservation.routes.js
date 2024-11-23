const { Router } = require('express')
const verifyToken = require('../auth/authMiddleware')

const ReservationController = require('../controllers/ReservationController')

const reservationRoutes = Router()

const reservationController = new ReservationController()

reservationRoutes.post('/reserveStation', verifyToken(['user', 'admin']), reservationController.reserveStation)
reservationRoutes.put('/update', verifyToken(['user', 'admin']), reservationController.update)
reservationRoutes.get('/', verifyToken(['user', 'admin']), reservationController.findMany)
reservationRoutes.delete('/delete', verifyToken(['user', 'admin']), reservationController.delete)
reservationRoutes.get('/findReservedByDate', verifyToken(['user', 'admin']), reservationController.findReservedByDate)
reservationRoutes.get('/findReservationByUserId', verifyToken(['user', 'admin']), reservationController.findReservationByUserId)


module.exports = reservationRoutes