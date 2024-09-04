const Anime = require('../models/Anime');
const Rating = require('../models/Rating');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs');

const createAnime = async (req, res) => {
    // try {
        const { title, description } = req.body;

        // Verifica se o anime a ser criado existe
        const existingAnime = await Anime.findOne({ title });
        if (existingAnime) {
            return res.status(400).json({ error: 'Anime already created' });
        }

        // Validação: Verifica se title e description são strings
        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid data format. Title and description must be strings.' });
        }

        // Cria um novo anime
        const anime = new Anime({ title, description});
        await anime.save();
        res.json({ success: true, message: 'Anime created successfully' });
    // } catch (error) {
    //     errorHandler.handle(res, error);
    // }
};

const editAnime = async (req, res) => {
        const animeTitle = req.params.title;
        const updatedAnime = req.body;

        // Verifica se o anime a ser editado existe
        const animeToUpdate = await Anime.findOne({ title: animeTitle });
        if (!animeToUpdate) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Validação: Verifica se title e description são strings
        if (typeof title !== 'string' || typeof description !== 'string') {
            return res.status(400).json({ error: 'Invalid data format. Title and description must be strings.' });
        }

        // Atualiza os dados do anime
        animeToUpdate.title = updatedAnime.title || animeToUpdate.title;
        animeToUpdate.description = updatedAnime.description || animeToUpdate.description;
                
        // Salva as alterações no banco de dados
        await animeToUpdate.save();

        res.status(200).json({ message: 'Hello Admin, Anime updated successfully', anime: animeToUpdate });
};

const deleteAnime = async (req, res) => {
        const animeTitle = req.params.title;

        // Verifica se o anime a ser excluido existe
        const animeToDelete = await Anime.findOne({ title: animeTitle });
        if (!animeToDelete) {
            return res.status(404).json({ error: 'Anime not found' });
        }

        // Remove o anime do banco de dados
        await animeToDelete.deleteOne();

        res.status(200).json({ message: 'Hello Admin, Anime deleted successfully' });
};

const listAnimes = async (req, res) => {
    try {
        const { limite, pagina } = req.query;

        // Validação: Verifica se os parâmetros de paginação são válidos
        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Invalid pagination parameters. Please provide valid values.' });
        }

        // Calcula o índice de início com base nos parâmetros de paginação
        const indiceInicio = (paginaInt - 1) * limiteInt;

        // Consulta os animes com a paginação
        const animes = await Anime.find().skip(indiceInicio).limit(limiteInt).populate('rating');

        // Validar se há animes para evitar enviar um array vazio
        if (!animes || animes.length === 0) {
            return res.status(404).json({ error: 'No animes found' });
        }

        res.json(animes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAnimeByTitle = async (req, res) => {
    const title = req.params.title;

    const animes = await Anime.findOne({ title: title}).populate('rating');

    // Verifica se o anime foi encontrado
    if (!animes) {
        return res.status(404).json({ error: 'Anime not found 10' });
    }

    res.json(animes);
};

// const exportAnimes = async (req, res) => {
//     const { data } = await listAnimes(req, res);
//     console.log(data);

//     const csvData = [];
//     data.forEach(anime => {
//       csvData.push({
//         Title: anime.title,
//         Description: anime.description,
//         Rating: anime.rating !== undefined ? anime.rating : 'N/A',
//         Comments: anime.comments !== undefined ? anime.comments: 'N/A',
//       });
//     });

//     const csvString = await convertToCSV(csvData);
//     const csvFileName = 'anime_list.csv';

//     fs.writeFileSync(csvFileName, csvString);

//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', `attachment; filename=${csvFileName}`);

//     fs.createReadStream(csvFileName).pipe(res);

//     return;
// };

const exportAnimes = async (req, res) => {
    // try {
        const { limite, pagina } = req.query;

        if (!limite || !pagina) {
            return res.status(400).json({ error: 'Limite and pagina parameters are required.' });
        }

        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Invalid pagination parameters. Please provide valid values.' });
        }

        const animes = await Anime.find().skip((paginaInt - 1) * limiteInt).limit(limiteInt).populate('rating');

        if (!animes || animes.length === 0) {
            return res.status(404).json({ error: 'No animes found' });
        }

        const csvData = [];
        animes.forEach(anime => {
            csvData.push({
                Title: anime.title,
                Description: anime.description,
                Rating: anime.rating !== undefined ? anime.rating : 'N/A',
                Comments: anime.comments !== undefined ? anime.comments : 'N/A',
            });
        });

        const csvString = await convertToCSV(csvData);
        const csvFileName = 'anime_list.csv';

        // Usando res.attachment para configurar os cabeçalhos necessários
        res.attachment(csvFileName);
        // Enviando o conteúdo do arquivo CSV diretamente
        res.send(csvString);

        return;
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    // }
};



function convertToCSV(data) {
    const header = Object.keys(data[0]).join(',') + '\n';
  
    const rows = data.map(obj => {
      return Object.values(obj).map(val => `"${val}"`).join(',');
    }).join('\n');
  
    return header + rows;
  }

module.exports = {
    createAnime,
    editAnime,
    deleteAnime,
    listAnimes,
    getAnimeByTitle,
    exportAnimes
};
