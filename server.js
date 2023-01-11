const express = require("express");
const app = express();
const cors = require("cors");

const { config } = require("./config");
const auth = require("./route/auth.route");
const blog = require("./route/blog.route");
const { errorHandler, invalidRoute } = require("./error");
const db = require("./queries");

db.initDatabase();

const port = config.app.port;
app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/blog", blog);

app.get("/", (req, res) => {
  res.json({ message: "BLOG SERVER" });
});

app.use("/*", invalidRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
