const allCasesModelLoad = require("../models/cases-model.js");

async function dataLoad() {
  try {
    const allCasesModel = await allCasesModelLoad.allCases();

    // Array com uma lista de todos as chaves que são os nomes dos países
    exports.allCountries = () => {
      return Object.keys(allCasesModel);
    };

    // Filtro com informações de todos os casos registrados no país
    exports.countryCases = (selectCountry) => {
      return Object.values(allCasesModel[selectCountry]);
    };
  } catch (err) {
      console.log('Error! Server controller "/controllers/cases-controller"')
  }
}
dataLoad();
module.exports.dataLoad = dataLoad;
