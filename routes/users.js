const express = require("express");
const fetch = require("node-fetch");
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const User = require("../models/User");

/**
 * Registering a user
 */
router.post("/register", async (req, res) => {
  //Pull out the data from the request body
  //Check to see if there is a user with that email

  const { email, password } = req.body;
  console.log(req.body);
  if (!password) {
    res.status(400).json({ msg: "No password was provided" });
  }
  if (!email) {
    res.status(400).json({ msg: "No email was provided" });
  }
  try {
    let user = await User.findOne({
      email
    });
    //Go though the MongoDB and see if the email is already registered
    if (user) {
      return res.status(400).json({
        msg: `Email ${email} is already in use!`
      });
    }

    //If the email is not already in use make the user
    user = new User({
      email,
      password
    });

    //Use bcrypt for password encryption, returns a promise
    const salt = await bcrypt.genSalt(10); //The salt is needed for encryption

    //Gives us a hashed version of the password
    user.password = await bcrypt.hash(password, salt);

    //Save it in our db
    await user.save();

    //Payload for jwt to store the user's id
    const payload = {
      user: {
        id: user.id
      }
    };

    //jwt takes: Sign, payload, options, and a call back
    //When it expires they'll have to log back in
    jwt.sign(
      payload,
      process.env.JWS || config.get("jwtSecret"),
      {
        expiresIn: 46000
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); //Note that "/" here refers to the prefix of "api/users" + "/"

router.post("/buy", async (req, res) => {
  //Pull out the ticker and number of stocks the user asked to buy
  const { ticker, numStocks, email } = req.body;
  const apiResponse = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`
  );
  let data = await apiResponse.json();
  data = data["Global Quote"];
  console.log(data);
  //Verify the current user's balance from the db
  const user = await User.findOne({
    email
  });
  // console.log(user);
  const bal = user.balance;
  const totalPrice = numStocks * parseInt(data["05. price"]);
  let bought = false;
  // console.log(bal);
  ///Check that they have enough money, we can send api response if they don't, and the front end can use that response to display the message.
  console.log(data);
  if (bal > totalPrice) {
    console.log("bal" + bal);
    console.log("price" + totalPrice);
    console.log("you can buy it!");
    bought = true;
  } else {
    console.log("you cant afford this!");
  }

  //   console.log(stuff);
  res.json(data);
});

module.exports = router;
