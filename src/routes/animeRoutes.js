const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');
const authServices = require('../services/authMiddleware');
const adminServices = require('../services/adminService');

// Admin cadastra animes
router.post('/create', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, animeController.createAnime);
// Admin edita animes
router.put('/edit/:title', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, animeController.editAnime);
// Admin deleta animes
router.delete('/delete/:title', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, animeController.deleteAnime);
// Lista todos animes
router.get('/list', animeController.listAnimes);

// Exporta a lista de animes
router.get('/exportAnimes',  animeController.exportAnimes);
// Lista por nome
router.get('/:title', animeController.getAnimeByTitle);

module.exports = router;
