var express = require("express");
var bodyParser = require("body-parser");
("bcryptjs");
const jwt = require("jsonwebtoken");

//Connect to Database
var db = require("../models");
module.exports = function (app) {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/api/forumposts", verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        console.log(error);
        res.sendStatus(403);
      } else {
        console.log("REQ BODY: ");
        console.log(req.body);
        const postTitle = req.body.title;
        const postBody = req.body.body;
        db.Post.create({
          postTitle: postTitle,
          postBody: postBody,
          UserId: authData.id,
        });
        res.json({ message: "Post Created", authData });
      }
    });
  });

  app.get("/api/forumposts", async (req, res) => {
    db.Post.findAll().then((postDump) => {
      res.json(postDump);
    });
  });
};

// TOKEN FORMAT
// Authorization: Bearer <access token>

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    //Split at space
    const bearer = bearerHeader.split(" ");
    //Get token from array
    const bearerToken = bearer[1];
    //Set token
    req.token = bearerToken;
    //Move on
    next();
  } else {
    res.sendStatus(403);
  }
}
