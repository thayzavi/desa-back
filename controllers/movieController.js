const Movie= require('../models/movie');

// Criar novo 
exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os filmes
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate('director', 'name nationality');
        res.status(200).json(movies);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter filme por ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate('director', 'name');
        if (!movie) {
            return res.status(404).json({ message: 'Filme não encontrado' });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar filme
exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: 'Filme não encontrado' });

        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar filme
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });

        res.status(200).json({ message: 'Filme excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};