var express = require("express");
// var router = express.Router();
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

  app.post("/register", async (req, res) => {
    try {
      const { email, password, username } = req.body;

      if (!email || !password) {
        res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
        return;
      }

      const hash = await bcrypt.hash(password, 10);
      await db.User.create({
        username: username,
        email: email,
        password: hash,
      }).then(function (forumDB) {
        res.json(forumDB);
        return;
      });

      // return res.status(200).json("All good!");
    } catch (e) {
      console.log(e); // Uncomment if needed for debug
      // If a SQLITE_CONSTRAINT has been violated aka. row with that email already exists. You can read more: https://www.sqlite.org/c3ref/c_abort.html
      if (e.errno === 19) {
        res.status(400).json("A user with that email already exists!");
        return;
      } else {
        res.status(400).json("Something broke!");
        return;
      }
    }
  });

  app.post("/login", async (req, res) => {
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
          jwt.sign({ user: user }, "secretKey", (err, token) => {
            res.json({
              token: token,
            });
          });
        } else {
          res.json("Wrong password");
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
