const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");

//Connect to Database
var db = require("../models");
const user = require("../models/user");
module.exports = function (app) {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.post("/api/likepost/id=:postID", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        db.Like.create({
          PostId: req.params.postID,
          UserId: authData.id,
        })
          .then(() => {
            return db.Like.count({
              where: { PostId: req.params.postID },
            });
          })
          .then((c) => {
            console.log(c);
            db.Post.update(
              {
                rating: c,
              },
              { where: { id: req.params.postID } }
            );
            res.json(c);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });

  app.delete("/api/unlikepost/id=:postID", verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        db.Like.destroy({
          where: { PostId: req.params.postID, UserId: authData.id },
        })
          .then(() => {
            return db.Like.count({
              where: { PostId: req.params.postID },
            });
          })
          .then((c) => {
            db.Post.update(
              {
                rating: c,
              },
              { where: { id: req.params.postID } }
            );
            res.json(c);
          });
      }
    });
  });
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
};
