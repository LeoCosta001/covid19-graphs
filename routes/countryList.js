const express = require("express");
const router = express.Router();

const casesController = require("../controllers/cases-controller");

router.get("/", async function (req, res, next) {
  try {
    const allCountries = await casesController.allCountries();
    res.send(allCountries);
  } catch {
    console.log('ERROR! Server router "/database/country-list" dont work!');
  };
});

module.exports = router;