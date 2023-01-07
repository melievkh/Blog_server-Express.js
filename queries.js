const pool = require("./config/db.config");

const db = {
  getUsers: async () => {
    const user = await pool.query(`SELECT * FROM users`);
    return user.rows;
  },

  registerUser: async (id, firstname, lastname, username, email, password) => {
    const user = await pool.query(
      `INSERT INTO users VALUES(
      $1, $2, $3, $4, $5, $6
    ) RETURNING *`,
      [id, firstname, lastname, username, email, password]
    );
    return user.rows[0];
  },
};

module.exports = db;
