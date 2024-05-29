const { Router } = require("express");

const userRoutes = require('./user.routes')
const meetingRoomRoutes = require('./meetingRoom.routes')
const workstationRoutes = require('./workstation.routes')
const adminRoutes = require('./admin.routes')

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/meetingRoom', meetingRoomRoutes)
routes.use('/workstation', workstationRoutes)
routes.use('/admin', adminRoutes)

module.exports = routes