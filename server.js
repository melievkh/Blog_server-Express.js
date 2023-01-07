const express = require("express");
const { config } = require("./config");
const auth = require("./route/auth.route");
const { errorHandler } = require("./error");

const app = express();

const port = config.app.port;
app.use(express.json());

app.use("/auth", auth);

app.get("/", (req, res) => {
  res.json({ message: "BLOG SERVER" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
