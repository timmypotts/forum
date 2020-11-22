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

  //Post a comment
  app.post("/api/comment/postID=:postID", verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        console.log(error);
        res.sendStatus(403);
      } else {
        db.Comment.create({
          PostId: req.params.postID,
          UserId: authData.id,
          comment: req.body.commentText,
          username: authData.user,
        })
          .then((commentData) => {
            res.json(commentData);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  });

  app.get("/api/comment/fetch-all/postID=:postID", async (req, res) => {
    db.Comment.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Like,
        },
      ],
      where: { PostId: req.params.postID },
    }).then((postDump) => {
      res.json(postDump);
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
