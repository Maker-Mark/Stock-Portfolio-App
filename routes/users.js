const express = require("express");
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

module.exports = router;
