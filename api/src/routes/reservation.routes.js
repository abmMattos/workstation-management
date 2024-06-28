const { Router } = require('express')

const ReservationController = require('../controllers/ReservationController')

const reservationRoutes = Router()

const reservationController = new ReservationController()

reservationRoutes.post('/reserveWorkstation', reservationController.reserveWorkstation)
reservationRoutes.post('/reserveMeetingRoom', reservationController.reserveMeetingRoom)
reservationRoutes.put('/update', reservationController.update)
reservationRoutes.get('/', reservationController.findMany)
reservationRoutes.delete('/delete', reservationController.delete)
reservationRoutes.get('/findReservedMeetingRoom', reservationController.findManyMeetingRoom)
reservationRoutes.get('/findReservedWorkstation', reservationController.findManyWorkstation)
reservationRoutes.get('/findReservedDateWorkstation', reservationController.findReservedWorkstationByDate)
reservationRoutes.get('/findReservedDateMeetingRoom', reservationController.findReservedMeetingRoomByDate)


module.exports = reservationRoutes