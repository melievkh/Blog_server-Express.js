require("dotenv").config();
const jwt_key = require("../nodemon.json");

module.exports.config = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST,
    salt: process.env.SALT,
    jwt_secret: jwt_key.env.JWT_KEY,
  },
  db: {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
