const express = require('express');
const router = express.Router();
const config = require('../config');
const jokeController = require('../controllers/jokeController');
const sharedController = require('../controllers/sharedController');

router.use(sharedController.checkForToken);

router.post('/newJoke', jokeController.newJoke);

router.get('/getAllJokes/:userId', jokeController.getAllJokes);

router.delete('/deleteJoke/:id', jokeController.deleteJoke);

router.put('/editJoke/:id', jokeController.editJoke);

module.exports = router;