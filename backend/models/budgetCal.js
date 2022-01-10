const mongoose = require('mongoose');

const BudgetCal = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    charge: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('BudgetCal', BudgetCal);