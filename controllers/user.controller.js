const { validationResult } = require("express-validator/check");
const _ = require("underscore");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const logger = require("../config/logger");

const login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }
  if (req.body.email && req.body.password) {
    const username = req.body.email;
    const password = req.body.password;
    //console.log(username,password);
    //db call for the user
    User.find({ username: username }, (err, user) => {
      if (err) throw err;
      if (user.length) {
        console.log(user);
        user[0].comparePassword(password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const payload = {
              id: user[0]._id,
              role: user[0].role
            };
            //token to send back as response
            const token = jwt.sign(
              payload,
              process.env.SECRETORKEY || "avadakedavra"
            );
            res.json({ message: "all cool", token: token });
          } else {
            res.status(401).json({ message: "passwords did not match" });
          }
        });
      } else {
        res.status(401).json({ message: "no such user found" });
      }
    });
  }
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }

  if (req.body.username && req.body.password && req.body.role) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const email = req.body.email;
    const name = req.body.name;

    const userData = {
      username,
      password,
      role,
      email,
      name
    };
    User.find({ username }, (err, user) => {
      if (err) throw err;
      if (!user.length) {
        User.create(userData, (err, user) => {
          if (err) throw err;
          //console.log(user);
          res.json({ message: "user created" });
        });
      } else {
        res.status(409).json({ message: "username already exists" });
      }
    });
  }
};

module.exports = { login, signup };
