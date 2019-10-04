const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Stock = require("../models/Stock"); // Import stock model

//First call on the api to get a response given a ticker
router.get("/:ticker", async (req, res) => {
  console.log(req.params.ticker);
  const apiResponse = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.params.ticker}&apikey=${process.env.API_KEY}`
  );
  let data = await apiResponse.json();
  //   console.log(stuff);
  res.json(data);
});

//Return the router
module.exports = router;
