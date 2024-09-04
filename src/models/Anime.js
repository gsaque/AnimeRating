const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    rating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

module.exports = mongoose.model('Anime', animeSchema);
