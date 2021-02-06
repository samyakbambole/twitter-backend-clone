const express = require('express'); 
const router = express.Router(); 
const Tweet = require('../models/tweet'); 

// Getting All 
router.get('/', async (req,res) => {
     try {
          const tweets = await Tweet.find(); 
          res.json(tweets); 
     } catch (err) {
          res.status(500).json({ message: err.message }); 
     }
}); 

// Getting One 
router.get('/:id', getTweet, (req,res) => {
     res.json(res.tweet); 
}); 

// Creating One 
router.post('/', async (req,res) => {
     const tweet = new Tweet({
          name: req.body.name, 
          tweet: req.body.tweet
     }); 
     
     try {
          const newTweet = await tweet.save(); 
          res.status(201).json({ message: "New Tweet Created!" }); 
     } catch (err) {
          res.status(400).json({ message: err.message }); 
     }
}); 

// Updating One 
router.patch('/:id', getTweet, async (req,res) => {
     if (req.body.name != null) {
          res.tweet.name = req.body.name; 
     }

     if (req.body.tweet != null) {
          res.tweet.tweet = req.body.tweet; 
     }

     try {
          const updatedTweet = await res.tweet.save(); 
          res.json(updatedTweet); 
     } catch (err) {
          res.status(400).json({ message: err.message }); 
     }
}); 

// Deleting one 
router.delete('/:id', getTweet, async (req,res) => {
     try {
          await res.tweet.remove(); 
          res.json({ message: "Deleted Tweet" }); 
     } catch (err) {
          res.status(500).json({ message: err.message }); 
     }
}); 

async function getTweet(req,res,next) {
     let tweet

     try {
          tweet = await Tweet.findById(req.params.id); 
          if (tweet == null) {
               return res.status(404).json({ message: "Could Not find tweet" }); 
          }
     } catch (err) {
          return res.status(500).json({ message: err.message }); 
     }

     res.tweet = tweet; 
     next(); 
}

module.exports = router; 