const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DinerSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: false
    },
    sodas: []
});

const diner = mongoose.model('diner', DinerSchema);

module.exports = diner;