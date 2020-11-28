var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verify-token");
const upload = require("../middleware/upload");
const uploadController = require("../controllers/upload");

//Connect to Database
var db = require("../models");
module.exports = function (app) {
  // Middleware
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Requiring a json web token makes it so only a logged in user may create a post
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

  // Route for uploading an image post
  app.post(
    "/api/forumposts/imagepost",
    verifyToken,
    upload.single("image"),
    async (req, res) => {
      if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
      }
      jwt.verify(req.token, "secretkey", (error, authData) => {
        if (error) {
          console.log(error);
          res.sendStatus(403);
        } else {
          uploadController.imagePost(req, res, authData);
        }
      });
    }
  );

  //GET SPECIFIC POST
  app.get("/api/forumpost/:id", async (req, res) => {
    db.Post.findOne({
      where: { id: req.params.id },
      include: {
        model: db.User,
      },
    }).then((post) => {
      res.json(post);
    });
  });

  //GET ALL POSTS FROM POSTS TABLE
  app.get("/api/forumposts", async (req, res) => {
    db.Post.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Like,
        },
      ],
    }).then((postDump) => {
      res.json(postDump);
    });
  });

  // GET ALL POSTS FROM LOGGED IN USER
  app.get("/api/forumposts/userposts", verifyToken, async (req, res) => {
    jwt.verify(req.token, "secretkey", (error, authData) => {
      if (error) {
        console.log(error);
        res.sendStatus(403);
      } else {
        db.Post.findAll({
          where: {
            UserId: authData.id,
          },
        }).then((userPosts) => {
          res.json(userPosts);
        });
      }
    });
  });

  //Delete a post from the user page
  app.delete(
    "/api/forumposts/delete/id=:postID",
    verifyToken,
    async (req, res) => {
      jwt.verify(req.token, "secretkey", (error, authData) => {
        if (error) {
          res.sendStatus(403);
        } else {
          db.Post.destroy({
            where: {
              id: req.params.postID,
            },
          });
          res.json({ message: "Post Deleted" });
        }
      });
    }
  );
};
