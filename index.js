const express = require("express");
const app = express();
const connectDB = require("./config/db");
connectDB();

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
