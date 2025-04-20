const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
   title: { type: String, required: true },
   director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true }
});
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;