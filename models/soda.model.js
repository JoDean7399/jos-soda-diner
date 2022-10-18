const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const SodaSchema = new Schema ({
    name: {
        type: String,
    },
    fizziness: {
        type: Number,
    },
    taste: {
        type: Number
    }
});

const sodas = mongoose.model('soda', SodaSchema);

module.exports = sodas;