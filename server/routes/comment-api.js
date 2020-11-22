const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

//Connect to Database
var db = require("../models");
module.exports = function (app) {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // TOKEN FORMAT
  // Authorization: Bearer <access token>

  app.post("/api/comment/postID=:postID", verifyToken, async (req, res) => {
    db.Comment.create({
      PostId: req.params.postID,
      UserId: authData.id,
    });
  });

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
};
