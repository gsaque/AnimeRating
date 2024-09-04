const mongoose = require('mongoose');
const User = require('../models/User'); 
const Anime = require('../models/Anime');
const Rating = require('../models/Rating');

const installDatabase = async (req, res) => {
  try {

    await User.insertMany([
      { name: 'User 1', email: 'usuario1@email.com', password: '123' },
      { name: 'User 2', email: 'usuario2@email.com', password: '123' },
      { name: 'User 3', email: 'usuario3@email.com', password: '123' },
      { name: 'Admin 1', email: 'admin1@email.com', password: 'admin', role: 'admin'},
      { name: 'Admin 2', email: 'admin2@email.com', password: 'admin', role: 'admin' }, 
    ]);

    await Anime.insertMany([
      { title: 'Shingeki no Kyojin', description: 'A humanidade está a beira do colapso' },
      { title: 'One Piece', description: 'Os Piratas do Chapéu de Palha' },
      { title: 'Bleach', description: 'Shinigamis' },
      { title: 'Kimetsu No Yaiba', description: 'Luta' },
      { title: 'Jujutsu No Kaisen', description: 'Luta' },
    ]);

    await Rating.insertMany([
      { rating: 10, animeTitle: 'Shingeki no Kyojin' },
      { rating: 10, animeTitle: 'One Piece' },
      { rating: 10, animeTitle: 'Bleach' },
      { rating: 10, animeTitle: 'Kimetsu No Yaiba' },
      { rating: 10, animeTitle: 'Jujutsu No Kaisen' },
    ]);

    res.json({ success: true, message: 'Database Installation Completed Successfully' });
  } catch (error) {
    console.error('Error during database installation:', error);
    res.status(500).json({ success: false, error: 'Error during database installation' });
  }
};

module.exports = {
  installDatabase,
};
