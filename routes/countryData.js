const express = require("express");
const router = express.Router();

const casesController = require("../controllers/cases-controller");

router.get("/", async function (req, res, next) {
  try {
    const selectCountry = req.query.country_select;
    const selectedCountry = selectCountry;
    const countryCases = await casesController
      .countryCases(selectCountry)
      .reverse();
    res.json({selectedCountry, countryCases});
  } catch(err) {
    console.log(`ERROR! Server router "/database/country-data" does not work! ${err}`);
    res.json({resError: true})
  }
});

module.exports = router;
