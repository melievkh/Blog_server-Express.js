const { validationResult } = require("express-validator");
const CustomError = require("../customError");

const validator = (req, res, next) => {
  const result = validationResult(req).array();
  if (result.length) {
    throw new CustomError(404, result[0].msg);
  }
  next();
};

module.exports = validator;
