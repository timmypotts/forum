var express = require("express");
const bodyparser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Allows connection
var cors = require("cors");

// Requiring our models for syncing
var db = require("./models");
global.__basedir = __dirname;

// Sets up the Express app to handle data parsing
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// Static directory
app.use("/uploads", express.static("uploads"));

// Routes
// =============================================================
require("./routes/user-api.js")(app);
require("./routes/post-api")(app);
require("./routes/likes-api.js")(app);
require("./routes/comment-api")(app);
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
