const mongoose = require('mongoose');

const BudgetCal = mongoose.Schema({
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