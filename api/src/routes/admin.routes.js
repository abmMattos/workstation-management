const { Router } = require('express')

const AdminController = require('../controllers/AdminController')

const adminRoutes = Router()

const adminController = new AdminController()

adminRoutes.post('/create', adminController.create)
adminRoutes.put('/update', adminController.update)
adminRoutes.get('/login', adminController.login)
adminRoutes.get('/', adminController.findMany)
adminRoutes.delete('/delete', adminController.delete)
adminRoutes.get('/findunique', adminController.findUnique)



module.exports = adminRoutes