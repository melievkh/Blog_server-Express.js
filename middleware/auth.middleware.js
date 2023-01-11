const jwt = require("jsonwebtoken");
const { config } = require("../config");
const CustomError = require("../customError");

module.exports.authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new CustomError(401, "You should login first");
    }

    const { id } = jwt.verify(token, config.app.jwtSecret);
    req.userId = id;
    next();
  } catch (error) {
    next(error);
  }
};
