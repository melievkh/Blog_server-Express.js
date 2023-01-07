const { config } = require("./index");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: config.db.user,
  host: config.app.host,
  port: config.db.port,
  database: config.db.database,
  password: config.db.password,
});

module.exports = pool;
