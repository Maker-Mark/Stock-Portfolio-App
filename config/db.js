const mongoose = require("mongoose");
const config = require("config");
const db = process.env.DB || config.get("mongoURI");

// Mongoose returns promises, let's use async await and try-catch
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
//Export the database
module.exports = connectDB;
