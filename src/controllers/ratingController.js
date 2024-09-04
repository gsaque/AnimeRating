const Anime = require('../models/Anime');
const Rating = require('../models/Rating');
const user = require('../models/User');
const errorHandler = require('../utils/errorHandler');

const rateAnime = async (req, res) => {
    // try {
        const animeTitle = req.params.animeTitle;
        const ratingValue = req.body.rating;
        const comments = req.body.comments;

        // Encontrar o anime pelo nome
        const anime = await Anime.findOne({ title: animeTitle });
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Criar um novo Rating
        const rating = new Rating({ rating : ratingValue, comments: comments });

        // Salvar o Rating
        await rating.save();

        // Adicionar a avaliação ao array de avaliações do anime
        anime.rating.push(rating._id);
        await anime.save();

        res.json({ success: true, message: 'Rating added successfully' });
    // } catch (error) {
    //     errorHandler.handle(res, error);
    // }
};

const listRatingsByValue = async (req, res) => {
    try {
        const { limite, pagina } = req.query;
        const ratingValue = req.params.rating;

        // Validação: Verifica se os parâmetros de paginação são válidos
        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Invalid pagination parameters. Please provide valid values.' });
        }

        // Calcula o índice de início com base nos parâmetros de paginação
        const indiceInicio = (paginaInt - 1) * limiteInt;

        // Consulta as avaliações pelo valor com a paginação
        const ratings = await Rating.find({ rating: Number(ratingValue) }).skip(indiceInicio).limit(limiteInt);

        // Verifica se há avaliações encontradas
        if (!ratings || ratings.length === 0) {
            return res.status(404).json({ error: 'No ratings found for the provided value.' });
        }

        res.json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editCommentsRatings = async (req, res) => {
    const comment = req.params.comments;
    const updatedComments = req.body;


    const commentsToUpdate = await Rating.findOne({ comments: comment });

    // Verifica se o comentário foi encontrado
    if (!commentsToUpdate) {
        return res.status(404).json({ error: 'Comment not found' });
    }

    // Atualiza o Comentário
    commentsToUpdate.comments = updatedComments.comments || commentsToUpdate.comments;

    // Salva as alterações
    await commentsToUpdate.save();

    res.status(200).json({ message: 'Hello Admin, Comments updated successfully' });
};

const deleteRating = async (req, res) => {
    const ratingId = req.params._id;

    // Verifica se o rating a ser excluido existe
    const ratingToDelete = await Rating.findOne({ _id: ratingId });
    if (!ratingToDelete) {
        return res.status(404).json({ error: 'Rating not found' });
    }

    // Remove o rating do banco de dados
    await ratingToDelete.deleteOne();

    res.status(200).json({ message: 'Hello Admin, Rating deleted successfully' });
};

// const deleteAll = async (req, res) => {
//     const animeTitle = req.params.title;

//     // Verifica se o anime existe
//     const animeToUpdate = await Anime.findOne({ title: animeTitle });
//     if (!animeToUpdate) {
//         return res.status(404).json({ error: 'Anime not found' });
//     }
    
//     // Deleta no banco de dados
//     await animeToUpdate.rating.deleteMany();
    

//     res.status(200).json({ message: 'Hello Admin, Anime updated successfully', anime: animeToUpdate });

    
// }

const deleteAll = async (req, res) => {
    // try {
        const animeTitle = req.params.title;
        console.log("entrou");
        console.log(animeTitle);

        // Encontrar o anime pelo nome
        const anime = await Anime.findOne({ title: animeTitle });
        if (!anime) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Encontrar e deletar todos os ratings associados ao anime
        await Rating.deleteMany({ _id: { $in: anime.rating } });

        // Limpar o array de ratings do anime
        anime.rating = [];
        await anime.save();

        res.status(200).json({ message: 'All ratings for the anime deleted successfully' });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
};


  

module.exports = {
    rateAnime,
    listRatingsByValue,
    editCommentsRatings,
    deleteRating,
    deleteAll
};
