const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true    
    }
})

module.exports = mongoose.model('Movie', movieSchema);