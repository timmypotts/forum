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

  //GET SPECIFIC POST
  app.get("/api/forumposts/:id", async (req, res) => {
    var primaryKey = req.params.id;
    db.Post.findByPk(primaryKey).then((post) => {
      res.json(post);
    });
  });

  //GET ALL POSTS FROM POSTS TABLE
  app.get("/api/forumposts", async (req, res) => {
    db.Post.findAll({
      include: [{
        model: db.User
      }]
    }).then((postDump) => {
      res.json(postDump);
    });
  });



// GET ALL POSTS FROM SPECIFIC USER
app.get("/api/userposts", verifyToken, async(req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      console.log(error);
      res.sendStatus(403);
    } else {
      console.log("REQ BODY: ");
      console.log(req.body);
      db.Post.findAll({
        where: {
        UserId: authData.id
        }
      }).then((userPosts) => {
      res.json( userPosts );
    })
    }
  });
});

//Delete a post from the user page
app.delete("/api/deletePost/id=:postID", verifyToken, async(req, res) => {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if (error) {
      console.log(error);
      res.sendStatus(403);
    } else {
      console.log("REQ BODY: ");
      console.log(req.body);
      db.Post.destroy({
        where: {
        id: req.params.postID
        }
      });
      res.json({message: "Post Deleted"});
    }
  });
});

// app.put("/api/likePost")

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
