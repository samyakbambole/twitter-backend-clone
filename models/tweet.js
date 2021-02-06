const mongoose = require('mongoose'); 

const tweetSchema = new mongoose.Schema({
     name: {
          type: String, 
          required: true
     }, 
     tweet: {
          type: String, 
          required: true
     }, 
     date: {
          type: Date,
          required: true, 
          default: Date.now
     }
}); 

module.exports = mongoose.model('Tweet', tweetSchema); 