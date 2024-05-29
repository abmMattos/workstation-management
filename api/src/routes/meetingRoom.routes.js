const { Router } = require('express')

const MeetingRoomController = require('../controllers/MeetingRoomController')

const meetingRoomRoutes = Router()

const meetingRoomController = new MeetingRoomController()

meetingRoomRoutes.post('/create', meetingRoomController.create)
meetingRoomRoutes.put('/update', meetingRoomController.update)
meetingRoomRoutes.get('/', meetingRoomController.findMany)
meetingRoomRoutes.delete('/delete', meetingRoomController.delete)
meetingRoomRoutes.get('/findunique', meetingRoomController.findUnique)



module.exports = meetingRoomRoutes