var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json(`Missing ${!email ? "email" : "password"}!`);
    }

    const hash = await bcrypt.hash(password, 10);
    await db("users").insert({ email: email, hash: hash });

    res.status(200).json("All good!");
  } catch (e) {
    // console.log(e); // Uncomment if needed for debug
    // If a SQLITE_CONSTRAINT has been violated aka. row with that email already exists. You can read more: https://www.sqlite.org/c3ref/c_abort.html
    if (e.errno === 19) {
      res.status(400).json("A user with that email already exists!");
    } else {
      res.status(400).json("Something broke!");
    }
  }
});

module.exports = router;
