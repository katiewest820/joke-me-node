const mongoose = require('mongoose');

var jokeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  joke: String,
  punchLine: String
});

module.exports = mongoose.model('joke', jokeSchema);