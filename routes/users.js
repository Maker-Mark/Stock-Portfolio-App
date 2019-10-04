const express = require("express");
const fetch = require("node-fetch");
// const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/RequiredAuth");
const User = require("../models/User");

router.post("/login/", async (req, res) => {
  let { email, password } = req.body; //Destructure the request's data
  console.log(req.body);
  email = email.toLowerCase();
  //See if it's valid and see if we can hash it and login
  try {
    //Use the User model's method findOne to check if the email is actually registered
    let user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        msg: "Email not registered!"
      });
    }

    //If the email exits, let's check the password via a bcrypt.compare hashing
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Incorrect password!"
      });
    }

    //If the pw is correct give this payload for jwt
    const payload = {
      user: {
        id: user.id
      }
    };
    //jwt takes: Sign, payload, options, and a call back
    //When it expires they'll have to log back in
    jwt.sign(
      //Sign the jwt with the payload given the secret and set it to expire.
      payload,
      process.env.JWS || config.get("jwtSecret"),
      {
        expiresIn: 46000
      }, //res.json the token as a object
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
}); //Note that "/" here refers to the prefix of "api/users" + "

/**
 * Registering a user
 */
router.post("/register", async (req, res) => {
  //Pull out the data from the request body
  //Check to see if there is a user with that email
  const id = req.id;
  let { email, password, name } = req.body;
  // console.log(req.body)
  email = email.toLowerCase();

  try {
    const dbuser = await User.findById(id).select("-password"); // Return all but the PW

    //Go though the MongoDB and see if the email is already registered
    if (dbuser) {
      return res.status(400).json({
        err: `Email ${email} is already in use!`
      });
    }

    //If the email is not already in use make the user
    const user = new User({
      email,
      password,
      name
    });
    console.log(user);

    //Use bcrypt for password encryption, returns a promise
    //The salt is needed for encryption
    const salt = await bcrypt
      .genSalt(10)
      .catch(err => console.error("Bcrypt Err:" + err.message));

    //Gives us a hashed version of the password
    user.password = await bcrypt
      .hash(password, salt)
      .catch(err => console.error("Bcrypt Err:" + err.message));

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
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/buy", auth, async (req, res) => {
  //Pull out the ticker and number of stocks the user asked to buy
  // console.log(req);
  const id = req.id;
  let { ticker, numStocks, email } = req.body;
  // email = email.toLowerCase();
  // console.log(email);
  const apiResponse = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=LP7OHCT0JUHMK0C9`
  );

  try {
    let data = await apiResponse.json();

    //Pull out the isolated day's data
    data = data["Global Quote"];
    console.log(data);
    let dateRec = Date();
    //Build a transaction from the data
    const transaction = await {
      symbol: data["01. symbol"],
      price: data["05. price"],
      quantity: numStocks,
      action: "BUY",
      date: dateRec.toString().substring(0, 15)
    };
    console.log(transaction);

    const user = await User.findById(id).select("-password"); // Return all but the PW

    //Grab the balance
    const bal = user.balance;
    //Calculate the total purchase
    const totalPrice = numStocks * parseInt(data["05. price"]);

    //Initialize a boolean to flag if the sale goes though(meaning they have enough money)
    let didBuy = false;

    ///Check that they have enough money, we can send api response if they don't, and the front end can use that response to display the message.
    // console.log(data);
    if (bal > totalPrice) {
      console.log("bal" + bal);
      console.log("price" + totalPrice);
      console.log("you can buy it!");
      didBuy = true;
    } else {
      console.log("you cant afford this!");
    }

    // console.log(user);
    // Meaning the user can afford to buy these stocks
    let userTrans = user.transactions;
    let currentStocks = user.portfolio.stocks;
    let portfolioStocks = user.portfolio.stocks;
    let stockInfo = {
      symbol: transaction.symbol,
      quantity: transaction.quantity
    };
    if (didBuy) {
      user.balance = user.balance - totalPrice;
      userTrans.push(transaction);
      user.transactions = userTrans;
      user.portfolio.stocks = portfolioStocks;
      currentStocks.push(stockInfo);
      user.portfolio.stocks = currentStocks;
      let newVal = transaction.quantity * transaction.price;
      user.portfolio.totalValue = user.portfolio.totalValue + newVal;
    }
    let myMap = new Map();
    let cleanedTrans = user.transactions;
    console.log(user.transactions);
    cleanedTrans.forEach(trn => {
      // console.log(trn);
      if (myMap.has(trn.symbol)) {
        myMap.set(trn.symbol, {
          symbol: myMap.get(trn.symbol).symbol,
          price: parseInt(myMap.get(trn.symbol).price) + parseInt(trn.price),
          quantity:
            parseInt(myMap.get(trn.symbol).quantity) + parseInt(trn.quantity)
        });
      } else {
        myMap.set(trn.symbol, {
          symbol: trn.symbol,
          price: trn.price,
          quantity: parseInt(trn.quantity)
        });
      }
    });
    console.log("CLEANED!!");
    // console.log(myMap.values());
    let newArr = [];
    for (let [key, val] of myMap.entries()) {
      newArr.push(val);
      // console.log(newArr);
    }
    console.log(newArr);
    // user.portfolio.stocks = myMap.values();
    console.log("transactions");
    user.save();

    //   console.log(stuff);
    res.json(data);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Get a user
router.get("/", auth, async (req, res) => {
  try {
    const id = req.id;
    const user = await User.findById(id).select("-password"); // Return all but the PW
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
