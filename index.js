require('dotenv').config(); 

const express = require('express'); 
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const app = express(); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
const db = mongoose.connection
db.on('error', (error) => {
     console.error(error); 
}); 
db.once('open', () => {
     console.log('Connected to Database'); 
}); 

app.use(morgan('tiny')); 
app.use(express.json()); 

const tweetsRouter = require('./routes/tweets'); 
app.use('/tweets', tweetsRouter); 

app.get('/', (req,res) => {
     res.send('Hello World!'); 
}); 

app.listen('5000', () => {
     console.log('Express API Running on port 5000!'); 
}); 