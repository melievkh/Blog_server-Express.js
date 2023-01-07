const crypto = require("crypto");
const bcrypt = require("bcrypt");
const CustomError = require("../customError");
const db = require("../queries");
const { config } = require("../config");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const users = await db.getUsers();
    const foundUser = await users.find((user) => user.username === username);
    if (!foundUser) {
      throw new CustomError(404, "User not found!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      throw new CustomError(404, "Incorrect password!");
    }

    const token = await jwt.sign({ id: foundUser.id }, config.app.jwt_secret, {
      expiresIn: "60s",
    });
    res.status(200).json({
      message: "Successfully logged in!",
      user: foundUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const users = await db.getUsers();
    const foundUser = await users.find(
      (user) => user.username === username || user.email === email
    );
    if (foundUser) {
      throw new CustomError(
        404,
        "There is user with this credentials! Enter another username or email!"
      );
    }

    const userId = crypto.randomBytes(16).toString("hex");
    const hashedPassword = await bcrypt.hash(password, Number(config.app.salt));
    const user = await db.registerUser(
      userId,
      firstname,
      lastname,
      username,
      email,
      hashedPassword
    );
    res.status(201).json({ message: "Registered successffully!", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
