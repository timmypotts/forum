var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Connect to Database
var db = require("../models");
module.exports = function (app) {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /* GET users listing. */
  // app.get("/", function (req, res, next) {
  //   res.send("respond with a resource");
  // });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, username, password } = req.body;
      console.log(email);

      if (!email || !password) {
        res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
        return;
      }

      const hash = await bcrypt.hash(password, 10);
      await db.User.create({
        username: username,
        email: email,
        password: hash,
      }).then(function (userPrivate) {
        const user = userPrivate.username;
        const id = userPrivate.id;

        jwt.sign({ user: user, id: id }, "secretkey", (err, token) => {
          res.status(200).json({
            username: user,
            token: token,
          });
        });
        return;
      });

      // return res.status(200).json("All good!");
    } catch (e) {
      console.log(e);

      if (e.parent.errno === 1062) {
        res
          .status(400)
          .json("A user with that email or username already exists!");
        return;
      } else {
        res.status(400).json("Something broke!");
        return;
      }
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      console.log(username, password);
      const user = await db.User.findOne({
        where: { username: username },
      });
      if (user) {
        const validPass = bcrypt.compareSync(password, user.password);
        if (validPass) {
          const tokenCred = username;
          const id = user.id;

          jwt.sign({ user: tokenCred, id: id }, "secretkey", (err, token) => {
            res.json({
              username: tokenCred,
              token: token,
            });
            return;
          });
        } else {
          res.status(400).json("Wrong password");
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("Something broke");
    }
  });
};
