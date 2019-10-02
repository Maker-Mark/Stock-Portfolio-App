const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  balance: {
    type: Number,
    default: 5000
  },
  transactions: []
});

//Export the model using the schema above
module.exports = mongoose.model("user", userSchema);
