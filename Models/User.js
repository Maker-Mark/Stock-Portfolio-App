const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 5000
  },
  transactions: []
});

//Export the model using the schema above
module.exports = mongoose.model("user", userSchema);
