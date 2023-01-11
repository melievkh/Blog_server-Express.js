const router = require("express").Router();
const { login, register } = require("../controller/auth.controller");
const validator = require("../middleware/validation.middleware");
const { loginSchema, registerSchema } = require("../schema/auth.schema");

router.post("/login", loginSchema, validator, login);
router.post("/register", registerSchema, validator, register);

module.exports = router;
