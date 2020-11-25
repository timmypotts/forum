// TOKEN FORMAT
// Authorization: Bearer <access token>

const verifyToken = (req, res, next) => {
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
};

module.exports = verifyToken;
