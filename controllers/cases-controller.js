const allCasesModelLoad = require("../models/cases-model.js");
const dataCasesMap = require("../methods/dataCasesMap.js");

async function dataLoad() {
  try {
    const allCasesModel = await allCasesModelLoad.allCases();

    /**********************************************************
     * Funções que retornam dados do JSON sem o método .map() *
     **********************************************************/

    // JSON completo sem modificação
    exports.allData = () => {
      return allCasesModel;
    };

    // Array com uma lista de todos as chaves que são os nomes dos países
    exports.allCountries = () => {
      return Object.keys(allCasesModel);
    };

    // Filtro com informações de todos os casos registrados no país
    // Param: "selectCountry" = STRING com o nome do país (em inglês)
    exports.countryCases = (selectCountry) => {
      return Object.values(allCasesModel[selectCountry]);
    };

    /***********************************************************************
     * Funções que retornam dados do JSON com novas chaves e novos valores *
     ***********************************************************************/
    exports.allDataMap = (countrySearch, firstDate, lastDate) => {
      const allCountryName = Object.keys(allCasesModel);

      let dataMapResult = dataCasesMap.remapAllData({
        countryNameList: allCountryName,
        data: allCasesModel,
        reverse: true,
        dateFormat: "DD/MM/AAAA",
        firstDate: firstDate ? firstDate : false,
        lastDate: lastDate ? lastDate : false,
      });

      if (!countrySearch) {
        return dataMapResult;
      } else {
        return dataMapResult.filter((i) => i.country == countrySearch);
      };

    };
  } catch (err) {
    console.log('Error! Server controller "/controllers/cases-controller"');
  }
}
dataLoad();

module.exports.dataLoad = dataLoad;
