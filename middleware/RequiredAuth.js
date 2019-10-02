const jwt = require("jsonwebtoken");
const config = require("config");

//Require Auth middleware authenticates a user by looking for a token and authenticating it via JWT
//Once a user is logged in, and has a token, we want to re-authenticate them for any protected routes, or any route you need to be logged in to see
//Middleware is a function that has access to the req/response cycle/object.
module.exports = function(req, res, next) {
  //Get the token from the header
  const token = req.header("x-auth-token");
  //Check if there is a token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization failed."
    });
  }
  //If there is a token..
  try {
    //Verify the Token in the header, pass in our JWT secret
    const decoded = jwt.verify(
      token,
      process.env.JWS || config.get("jwtSecret")
    );
    console.log(decoded);
    req.id = decoded.user.id;
    console.log(req.id);
    //req.id lives in the middleware
    next(); // move on
  } catch (err) {
    console.log(console.error(err));
    res.status(408).json({
      msg: "Token is invalid!"
    });
  }
};
