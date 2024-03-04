const Directors = require('../models/Directors');
const Movie = require('../models/Movies');
const message = require('../messages/messages');


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

       const directors = await query.populate('movie');
       //response status and message
       res.status(200).json({ 
           data: directors,
           message: message.director_endpoint,
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
        const {id} = req.params;
        const director = await Directors.findById(id).populate('movie');
        res.status(200).json({ 
            data: director,
            message: message.director_endpoint,
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
            message: message.director_endpoint,
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
                    message: message.director_not_found,
                    success: false
                });
            }
        });
        const director = await Directors.findByIdAndUpdate(id);
        res.status(200).json({ 
            data: director,
            message: message.director_endpoint,
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
       Directors.findByIdAndDelete(id, req.body, { new: false })
         .exec()
         .then(director => {
             if(!director){
                 console.log(director);
                 return res.status(404).json({
                     message: message.director_not_found,
                     success: false
                 });
             }
         });
        const director = await Directors.findByIdAndDelete(id);
        res.status(200).json({ 
            id,
            data: director,
            message: message.director_endpoint,
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