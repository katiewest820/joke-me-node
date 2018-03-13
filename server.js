const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { DATABASE_URL, PORT, CLIENT_ORIGIN } = require('./config');
const mongoose = require('mongoose');

const app = express();

const jokeRoutes = require('./routes/jokeRoute');

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors({origin: CLIENT_ORIGIN}));

app.all('/');
app.use('/joke', jokeRoutes);

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl);
  let db = mongoose.connection;
  db.on('error', err => {
    mongoose.disconnect();
  reject(err);
});
  db.once('open', () => {
    console.log(`Connected to a database ${databaseUrl}`)
});
  server = app.listen(port, () => {
      console.log(`your server is running on port: ${PORT}`);
  resolve();
});
});
}

function closeServer(){
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
        console.log('closing server');
      server.close(err => {
        if(err){
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.log(`internal server error: ${err}`).status(500));
};

module.exports = { app, runServer, closeServer };


