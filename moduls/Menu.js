const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Sour', 'Bitter', 'Salty', 'Spicy']
    },
    is_drink: {
        type: Boolean,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    num_sales: {
        type: Number,
        default: 0,
        min: 0
    }
});

const Menu = mongoose.model('Menu' , menuSchema);
module.exports = Menu;