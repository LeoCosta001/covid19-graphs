const fetch = require("node-fetch");

module.exports = {
  allCases: async () => {
    try {
      const urlCases = "https://pomber.github.io/covid19/timeseries.json";
      let urlAccess = await fetch(urlCases);
      let jsonAccess = await urlAccess.json();
      return jsonAccess;
    } catch (err) {
      console.log(`Fetch error: ${err}`);
    }
  }
};
