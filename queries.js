const pool = require("./config/db.config");

const db = {
  initDatabase: async () => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(60) PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        email VARCHAR(30) NOT NULL,
        password VARCHAR(100) NOT NULL
      )`);
      await pool.query(`CREATE TABLE IF NOT EXISTS blogs(
        blog_id VARCHAR(60) PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP,
        media VARCHAR(200) NOT NULL,
        user_id VARCHAR(60),
        category VARCHAR(60),
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async () => {
    const user = await pool.query(`SELECT * FROM users`);
    return user.rows;
  },

  registerUser: async (id, username, email, password) => {
    const user = await pool.query(
      `INSERT INTO users VALUES(
      $1, $2, $3, $4
    ) RETURNING *`,
      [id, username, email, password]
    );
    return user.rows[0];
  },

  // Blogs

  createBlogQuery: async (blog_id, title, description, media, category) => {
    const blog = await pool.query(
      `INSERT INTO blogs(blog_id, title, description, media, category) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [blog_id, title, description, media, category]
    );
    return blog.rows[0];
  },

  getBlogsQuery: async () => {
    const blogs = await pool.query(
      req.body.category
        ? `SELECT * FROM blogs WHERE category = $1`
        : `SELECT * FROM blogs`,
      [req.body.category]
    );
    return blogs.rows;
  },

  findBlogQuery: async (id) => {
    const blog = await pool.query(`SELECT * FROM blogs WHERE blog_id = $1`, [
      id,
    ]);
    return blog.rows[0];
  },

  deleteBlogQuery: async (id) => {
    await pool.query(`DELETE FROM blogs WHERE blog_id = $1`, [id]);
  },

  updateBlogQuery: async (blog_id, title, description, updated_at, media) => {
    const updatedBlog = await pool.query(
      `UPDATE blogs SET title=$1, description=$2, updated_at=$3 media=$4 WHERE blog_id=$5`,
      [title, description, updated_at, media, blog_id]
    );
    return updatedBlog.rows[0];
  },
};

module.exports = db;
