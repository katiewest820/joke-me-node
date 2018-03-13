exports.PORT = process.env.PORT || 8080;

exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8100/';

exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      'mongodb://Admin:password123@ds213259.mlab.com:13259/joke-me';