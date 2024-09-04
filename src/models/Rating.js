const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    comments: { type: String }
});

module.exports = mongoose.model('Rating', ratingSchema);
