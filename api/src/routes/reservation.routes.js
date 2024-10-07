const { Router } = require('express')

const ReservationController = require('../controllers/ReservationController')

const reservationRoutes = Router()

const reservationController = new ReservationController()

reservationRoutes.post('/reserveStation', reservationController.reserveStation)
reservationRoutes.put('/update', reservationController.update)
reservationRoutes.get('/', reservationController.findMany)
reservationRoutes.delete('/delete', reservationController.delete)
reservationRoutes.get('/findReservedByDate', reservationController.findReservedByDate)


module.exports = reservationRoutes