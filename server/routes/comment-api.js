const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
const verifyToken = require("../middleware/verify-token");

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
          .then(() => {
            return db.Comment.count({
              where: { PostId: req.params.postID },
            });
          })
          .then((c) => {
            console.log(c);
            db.Post.update(
              {
                commentCount: c,
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

  // Get all comments for a given Post
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

  // Get all comments for a given User
  app.get("/api/comment/usercomments/", verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        console.log(error);
        res.sendStatus(403);
      } else {
        db.Comment.findAll({
          where: { UserId: authData.id },
        }).then((response) => {
          res.json(response);
        });
      }
    });
  });

  // Delete a comment
  app.delete(
    "/api/comment/delete/:commentID",
    verifyToken,
    async (req, res) => {
      jwt.verify(req.token, "secretkey", (error, authData) => {
        if (error) {
          console.log(error);
          res.sendStatus(403);
        } else {
          db.Comment.destroy({
            where: { id: req.params.commentID },
          })
            .then(() => {
              return db.Comment.count({
                where: { PostId: req.params.postID },
              });
            })
            .then((c) => {
              console.log(c);
              db.Post.update(
                {
                  commentCount: c,
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
    }
  );
};
