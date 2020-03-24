module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_DB_URI,
    database: process.env.MONGO_ENV_DATABASE,
  },
};
