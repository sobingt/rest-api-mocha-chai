var secrets = {};

secrets.mongoURI = {
  development: 'mongodb://localhost/restapi-dev',
  test: 'mongodb://localhost/restapi-test',
  production: 'mongodb://localhost/restapi',
};

module.exports = secrets;