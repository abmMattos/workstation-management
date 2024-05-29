const { Router } = require('express')

const WorkstationController = require('../controllers/WorkstationController')

const workstationRoutes = Router()

const workstationController = new WorkstationController()

workstationRoutes.post('/create', workstationController.create)
workstationRoutes.put('/update', workstationController.update)
workstationRoutes.get('/', workstationController.findMany)
workstationRoutes.delete('/delete', workstationController.delete)
workstationRoutes.get('/findunique', workstationController.findUnique)



module.exports = workstationRoutes