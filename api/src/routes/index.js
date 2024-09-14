const { Router } = require("express");

const userRoutes = require('./user.routes')
const hardwareRoutes = require('./hardware.routes')
const adminRoutes = require('./admin.routes')
const reservationRoutes = require('./reservation.routes')
const stationRoutes = require('./station.routes')

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/admin', adminRoutes)
routes.use('/reservation', reservationRoutes)
routes.use('/hardware', hardwareRoutes)
routes.use('/station', stationRoutes)



module.exports = routes