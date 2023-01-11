const { body } = require("express-validator");

// register schema

module.exports.registerSchema = [
  body("username")
    .exists()
    .withMessage("required!")
    .isLength({ min: 4 })
    .withMessage("minimum character is 4!"),
  body("email")
    .exists()
    .withMessage("required!")
    .isEmail()
    .withMessage("enter valid email!")
    .isLength({ min: 4 })
    .withMessage("minimum character is 4!"),
  body("password")
    .exists()
    .withMessage("required!")
    .isLength({ min: 4 })
    .withMessage("minimum character is 4!"),
];

// login schema

module.exports.loginSchema = [
  body("username")
    .exists()
    .withMessage("required!")
    .isLength({ min: 4 })
    .withMessage("minimum character is 4!"),
  body("password")
    .exists()
    .withMessage("required!")
    .isLength({ min: 4 })
    .withMessage("minimum character is 4!"),
];
