const jwt = require("jsonwebtoken");
const { config } = require("../config");
const CustomError = require("../customError");

module.exports.authentication = async (req, res, next) => {
  try {
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new CustomError(404, "You should login first!");
    }

    const { id } = jwt.verify(token, config.app.jwt_secret);
    req.userId = id;

    next();
  } catch (error) {
    next(error);
  }
};
