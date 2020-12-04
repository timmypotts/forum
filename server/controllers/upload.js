const fs = require("fs");

const db = require("../models");

const imagePost = async (req, res, authData) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const postTitle = req.body.title;
    const postBody = req.body.body;
    console.log(req.body);
    db.Post.create({
      postTitle: postTitle,
      postBody: postBody,
      UserId: authData.id,
      image: req.file.path,
    });

    return res.send(`Image has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};

module.exports = {
  imagePost,
};
