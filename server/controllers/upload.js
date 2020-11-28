const fs = require("fs");

const db = require("../models");

const imagePost = async (req, res, authData) => {
  try {
    console.log("REQ: ");
    console.log(req);

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

    return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  imagePost,
};
