require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const budgetingRoute = require('./routes/BudgetCal');


const corsOption = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
}

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/budgetCal', cors(corsOption), budgetingRoute);
app.use(cors(corsOption));

// ROUTE
app.get('/', (req, res) => {
    res.send("Hello My Love")
});

app.get('/budgetCal', cors(corsOption), function (req, res) {
    res.send("Great");
})

// Connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.listen(3006);