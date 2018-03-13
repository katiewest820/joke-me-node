exports.PORT = process.env.PORT || 8080;

exports.CLIENT_ORIGIN = 'http://localhost:8100';
//process.env.CLIENT_ORIGIN ||

exports.DATABASE_URL = process.env.DATABASE_URL ||
                      global.DATABASE_URL ||
                      'mongodb://Admin:password123@ds213259.mlab.com:13259/joke-me';