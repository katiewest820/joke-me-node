const joke = require('../models/jokeModel');

exports.newJoke = (req, res) => {
  let newJoke = new joke();
  newJoke.joke = req.body.joke;
  newJoke.punchLine = req.body.punchLine;
  newJoke.userId = req.body.userId;
  newJoke.save()
    .then((newJoke) => {
      res.status(200).json({
        message: 'Your joke has been saved',
        data: newJoke
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Joke was not saved',
      data: err
    });
  });
};

exports.getAllJokes = (req, res) => {
  joke.find({})
    .then((jokes) => {
    res.status(200).json({
      message: 'Here are all of your jokes',
      data: jokes
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Unable to retrieve jokes',
      data: err
    });
  });
};

exports.deleteJoke = (req, res) => {
  joke.findByIdAndRemove(req.params.id)
    .then((joke) => {
    res.status(200).json({
      message: 'Your joke has been deleted',
      data: joke
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Unable to delete your joke',
      data: err
    });
  });
};

exports.editJoke = (req, res) => {
  joke.findById(req.params.id)
    .then((joke) => {
    let fieldsToEdit = ['joke', 'punchLine'];
    fieldsToEdit.forEach((field) => {
      if(field in req.body){
        joke[field] = req.body[field];
      }
    });
    joke.save();
    res.status(200).json({
      message: 'Your joke edits have been made',
      data: joke
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Unable to save changes to your joke',
      data: err
    });
  });
};