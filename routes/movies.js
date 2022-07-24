const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

// Getting all movies
router.get('/',async(req ,res)=>{
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})
// Getting one movie
router.get('/:title',getMovie,async (req , res)=>{
    res.json(res.movie);
})
// Creating a new movie
router.post('/',async(req, res)=>{
    const movie = new Movie({
        title : req.body.title,
        year : req.body.year,
        language : req.body.language,
        rating : req.body.rating
    })
    try{
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})
// Updating a movie detail
router.patch('/:id',getMovie,async(req, res)=>{
    if(req.body.title != null){
        res.movie.title = req.body.title;
    }
    if(req.body.year != null){
        res.movie.year = req.body.year;
    }
    if(req.body.language != null){
        res.movie.language = req.body.language;
    }
    if(req.body.rating != null){
        res.movie.rating = req.body.rating;
    }
    try{
        const updateMovie = await res.movie.save();
        res.json(updateMovie);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})
// Deleting a movie from the database
router.delete('/:id',getMovie,async (req ,res)=>{
    try{
        await res.movie.remove();
        res.json({message:'Movie Deleted'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
})
// middleware
async function getMovie(req , res, next){
    let movie;
    try{
        movie = await Movie.findById(req.params.id);
            if(movie == null){
                return res.status(404).json({message:'Cannot find movie'});
            }
        }catch(err){
            return res.status(500).json({message:err.message});
        }
        res.movie = movie;
        next();
    }

module.exports = router;