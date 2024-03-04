const Movie = require('../models/Movies');
const Director = require('../models/Directors');
const message = require('../messages/messages');

const getAllMovies = async (req, res) => {
    //try code block to get all movies with a success message
    try{
        const movies = await Movie.find({}).populate('director');
        res.status(200).json({ 
            data: movies,
            message: message.movie_endpoint, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const getMovieById = async (req, res) => {
    const {id} = req.params;
    //try code block to get a movie by id with a success message
    try{
        const movie = await Movie.findById(id).populate('director');
        res.status(200).json({ 
            data: movie,
            message: message.movie_endpoint, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
}

const createMovie = async (req, res) => {
    try{
        const {movie} = req.body;
        const director = await Director.findById(movie.director);
        Movie.find({
            title: movie.title,
            director: movie.director
        })
        .exec()
        .then(result=>{
            console.log(result);
            if(result.length > 0 ){
                return res.status(409).json({
                    message: message.movie_exists,
                    success: false
                });
            }
            //attaching the director object to the movie
            movie.director = director;
            //ceates a new movie model
            const newMovie = new Movie(movie);
            //push the movie id to the directer.books array
            director.movie.push(newMovie._id);
            //saves the movie and director data
            const queries = [newMovie.save(), director.save()];
             Promise.all(queries);
            console.log('data >>>', newMovie);
            res.status(200).json({ 
                data: newMovie,
                message: message.movie_endpoint, 
                success: true
            });
        })
        .catch(err=>{
            console.log(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                },
                success: false
            });
        });
    }
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const updateMovie = async (req, res) => {
    const {id} = req.params;
    //try code block to update a movie by id with a success message
    try{
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ 
            data: movie,
            message: message.movie_endpoint, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
};

const deleteMovie = async (req, res) => {
    const {id} = req.params;
    //try code block to delete a director with a success message
    try{
        const movie = await Movie.findByIdAndDelete(id, req.body, { new: false });
        res.status(200).json({ 
            id,
            data: movie,
            message: message.movie_endpoint, 
            success: true
        });
    }
    //catch code block to handle errors
    catch(error){
        if (error.name === 'ValidationError') {
            console.error('Error Validating!', error);
            res.status(422).json(error);
        }
        else{
            console.error(error);
            res.status(500).json(error);
        }
    }
}


module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};