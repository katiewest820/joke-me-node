const express = require('express');
const router = express.Router();
const config = require('../config');
const jokeController = require('../controllers/jokeController');

router.post('/newJoke', jokeController.newJoke);

router.get('/getAllJokes', jokeController.getAllJokes);

router.delete('/deleteJoke/:id', jokeController.deleteJoke);

router.put('/editJoke/:id', jokeController.editJoke);

module.exports = router;