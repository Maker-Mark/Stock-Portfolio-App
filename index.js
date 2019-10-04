const express = require("express");
const app = express();
const connectDB = require("./config/db");
//Establish the database connection
connectDB();

//Allow control origin, then call next middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});
//Allows us to accept body data
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
//Bring in user routes to the express app!
app.use("/users", require("./routes/users"));
app.use("/stocks", require("./routes/stocks"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));
