const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authServices = require('../services/authMiddleware');
const adminServices = require('../services/adminService');

// Avaliar um anime por nome
router.post('/:animeTitle/rate', authServices.authenticateMiddleware, ratingController.rateAnime);
// Listar avaliações por 0-10
router.get('/listByValue/:rating', authServices.authenticateMiddleware, ratingController.listRatingsByValue);
// Admin Edita comentários
router.put('/edit/:comments', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, ratingController.editCommentsRatings);
// Deleta as avaliações por id
router.delete('/:_id', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, ratingController.deleteRating);
// rota para apagar todos os ratings de um anime
router.delete('/deleteAll/:title', authServices.authenticateMiddleware, adminServices.authorizeAdminMiddleware, ratingController.deleteAll);

module.exports = router;
