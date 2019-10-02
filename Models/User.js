const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  balance: {
    type: Number,
    default: 5000
  },
  transactions: [],
  portfolio: {
    totalValue: {
      type: Number,
      default: 0
    },
    stocks: []
  }
});

//Export the model using the schema above
module.exports = mongoose.model("user", userSchema);
