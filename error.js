const CustomError = require("./customError");

module.exports.errorHandler = (err, req, res, next) => {
  if (err) {
    const { message } = err;

    if (err instanceof CustomError) {
      res.json({ message });
      return;
    }
    res.json({ message });
  }
};

module.exports.invalidRoute = (req, res, next) => {
  try {
    throw new CustomError(404, "Invalid route!");
  } catch (error) {
    next(error);
  }
};
