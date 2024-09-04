const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminServices = require('../services/adminService');
const authServices = require('../services/authMiddleware');

// usuario se cadastra
router.post('/register', userController.register);
// usuario se edita
router.put('/edit/:email', authServices.authenticateMiddleware, userController.edit);
// admin cadastra usuario
router.post('/admin/register', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, userController.adminAddUser);
// admin lista usuario
router.get('/admin/list', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, userController.adminListUser);
// atualiza usuário 
router.put('/admin/:email', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, userController.adminEditUser);
// excluir usuário
router.delete('/admin/:email', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, userController.adminDeletUser);
// admin cadastra admin
router.post('/admin/registerAdmin', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, userController.adminAddAdmin);


module.exports = router;
