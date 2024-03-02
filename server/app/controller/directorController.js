const Directors = require('../models/Directors');
const Movie = require('../models/Movies');

const getAllDirectors = async (req, res) => {
    //try code block to get all directors with a success message
    try{
        //query string
       let querString = JSON.stringify(req.query);

       querString = querString.replace(
           /\b(gt|gte|lt|lte|ne|in|nin)\b/g, 
           (match) => `$${match}`
       );

       let query = Directors.find(JSON.parse(querString));

       //select
       if(req.query.select){
           const fields = req.query.select.split(',').join(' ');
           query = Directors.find({}).select(fields);
       }
       //sort
       if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = Directors.find({}).sort(sortBy);
        } 
       //pagination
       if(req.query.page){
        const page= parseInt(req.query.page) || 1;
        const limit= parseInt(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        query.skip(skip).limit(limit);
       }

       const directors = await query;
       //response status and message
       res.status(200).json({ 
           data: directors,
           message: `${req.method} - request to Director endpoint`, 
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

const getDirectorById = async (req, res) => {
    //try code block to get a director by id with a success message
    try{
        const directorId= req.params.directorId;
        Directors.findById(directorId)
        .select('name _id')
        .populate('movie', 'title director')
        .exec()
        .then(director => {
            if(!director){
                console.log(director);
                return res.status(404).json({
                    message: message.directorNotFound(),
                    success: false
                });
            }   
        })
        const director = await Directors.findById(directorId);
        res.status(200).json({ 
            data: director,
            message: `${req.method} - request to Director endpoint`, 
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

const createDirector = async (req, res) => {
    //try code block to create a new director with a success message
    try{
        const {director} = req.body;
        const newDirector = await Directors.create(director);
        console.log('data >>>', newDirector);
        res.status(200).json({ 
            data: newDirector,
            message: `${req.method} - request to Director endpoint`, 
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

const updateDirector = async (req, res) => {
    //try code block to update a director with a success message
    try{
        const {id} = req.params;
        Directors.findByIdAndUpdate(id, req.body, { new: true })
        .exec()
        .then(director => {
            if(!director){
                console.log(director);
                return res.status(404).json({
                    message: 'Director not found',
                    success: false
                });
            }
        });
        const director = await Directors.findByIdAndUpdate(id);
        res.status(200).json({ 
            data: director,
            message: `${req.method} - request to Director endpoint`, 
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

const deleteDirector = async (req, res) => {
    //try code block to delete a director with a success message
    try{
        const {id} = req.params;
        const director = await Directors.findByIdAndDelete(id, req.body, { new: false });
        res.status(200).json({ 
            id,
            data: director,
            message: `${req.method} - request to Director endpoint`, 
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
    getAllDirectors,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
};