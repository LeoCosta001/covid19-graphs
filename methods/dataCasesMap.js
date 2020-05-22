/** Observações para a utilização e modificação dos métodos aqui presentes.
 * @global Os métodos que em que a nomeclatura começar com underline "_" significa que foram criados para
 * serem usados apenas por outros métodos aqui presentes.
 * @global Os métodos que tiverem na descrição um asterisco dentro das chaves {* Exemplo} significa
 * que o uso daquele parâmetro é obrigatório.
 * @global Qualquer alteração no retorno ou nos parâmetros dos métodos também deverá ser atualizado
 * de igual modo o seu comentário.
 */

module.exports = {
  /** "Metodo que refaz todo o JSON criando novas chaves e novos valores"
   * @method remapAllData
   * "Object com 6 atributos que serão usados nas configurações locais"
   * @param {*Object} localConfig
   * ########## Atributos usados dentro do "localConfig" ##########
   * "Array com a lista de nome de países que serão pesquisados no segundo parâmetro"
   * @argument {*Array with Strings} countryNameList
   * "Array com os casos de algum determinado país"
   * @argument {*Array with Objects} data
   * "Boolean, se for "true" então os casos serão listados da data atual até a mais antiga"
   * @argument {Boolean} reverse
   * "String com o formato da data de saída (Se o valor não for "DD/MM/AAAA" então
   * será mantido o formato original "AAAA-MM-DD")"
   * @argument {String} dateFormat
   * "String que define a partir de qual data os dados serão retornados (Ex: "20/4/2020")"
   * OBS: Se este atributo for omitido então a data será a partir do primeiro registro do banco de dados
   * @argument {String} firstDate
   * "String que define até qual data os dados serão retornados (Ex: "23/4/2020")"
   * OBS: Se este atributo for omitido então a data será até a data atual do registro do banco de dados
   * @argument {String} lastDate
   * ########## Retorno ##########
   * "Array com o JSON completo e modificado"
   * @return {Array with Objects}
   */
  remapAllData(localConfig) {
    let allCasesModelMapped = [];

    /*****************************************
     * Iterando nos dados de todos os países *
     *****************************************/

    // Adicionando novo JSON no "allCasesModelMapped"
    localConfig.countryNameList.forEach((value) => {
      // Adicionando as chaves/valores de "growthRate" e "in24Hours"
      let casesMapped = localConfig.data[value].map((valueMap, indexMap) => {
        let previewIndex =
          indexMap > 0 ? localConfig.data[value][indexMap - 1] : false;

        // FIX: Impede do bug em que a quantidade de registro seja menor que a do dia anterior
        if (valueMap.confirmed < previewIndex.confirmed) {
          valueMap.confirmed = previewIndex.confirmed;
        }
        if (valueMap.deaths < previewIndex.deaths) {
          valueMap.deaths = previewIndex.deaths;
        }
        if (valueMap.recovered < previewIndex.recovered) {
          valueMap.recovered = previewIndex.recovered;
        }

        return {
          date:
            localConfig.dateFormat == 'DD/MM/AAAA'
              ? this._modifyDateFormat(valueMap.date)
              : valueMap.date,
          confirmed: valueMap.confirmed,
          deaths: valueMap.deaths,
          recovered: valueMap.recovered,
          growthRate: this._addKeyGrowthRate(previewIndex, valueMap),
          in24Hours: this._addKeyIn24HoursLocal(previewIndex, valueMap),
        };
      });

      // Reescrevendo as chaves
      allCasesModelMapped.push({
        country: value,
        cases: localConfig.reverse ? casesMapped.reverse() : casesMapped,
      });
    });

    /***********************
     * Filtrando por datas *
     ***********************/

    if (localConfig.firstDate || localConfig.lastDate) {
      // Iterando em cada país
      localConfig.countryNameList.forEach((value, index) => {
        allCasesModelMapped[index].cases = this._filterCountryCasesByDate(
          allCasesModelMapped[index].cases,
          localConfig.firstDate,
          localConfig.lastDate
        );
      });
    }

    return allCasesModelMapped;
  },

  /** "Metodo que adiciona a chave/valor "growthRate""
   * @method remapCountryCases
   * "Object com 5 atributos que serão usados nas configurações locais"
   * @param {*Object} localConfig
   * ########## Atributos usados dentro do "localConfig" ##########
   * "Array com os casos de algum determinado país"
   * @argument {*Array with Objects} data
   * "Boolean, se for "true" então os casos serão listados da data atual até a mais antiga"
   * @argument {Boolean} reverse
   * "String com o formato da data de saída (Se o valor não for "DD/MM/AAAA" então
   * será mantido o formato original "AAAA-MM-DD")"
   * @argument {String} dateFormat
   * "String que define a partir de qual data os dados serão retornados (Ex: "20/4/2020")"
   * OBS: Se este atributo for omitido então a data será a partir do primeiro registro do banco de dados
   * @argument {String} firstDate
   * "String que define até qual data os dados serão retornados (Ex: "23/4/2020")"
   * OBS: Se este atributo for omitido então a data será até a data atual do registro do banco de dados
   * @argument {String} lastDate
   * ########## Retorno ##########
   * "Array com o casos modificados"
   * @return {Array with Objects}
   */
  remapCountryCases(localConfig) {
    /*******************************************
     * Iterando em todos os dados daquele país *
     * *****************************************/

    // Adicionando as chaves/valors de "growthRate" e "in24Hours"
    let dataCases = localConfig.data.map((valueMap, indexMap) => {
      let previewIndex = indexMap > 0 ? localConfig.data[indexMap - 1] : false;
      return {
        date:
          localConfig.dateFormat == 'DD/MM/AAAA'
            ? this._modifyDateFormat(valueMap.date)
            : valueMap.date,
        confirmed: valueMap.confirmed,
        deaths: valueMap.deaths,
        recovered: valueMap.recovered,
        growthRate: this._addKeyGrowthRate(previewIndex, valueMap),
        in24Hours: this._addKeyIn24HoursLocal(previewIndex, valueMap),
      };
    });

    /***********************
     * Filtrando por datas *
     * *********************/

    // Filtrando por datas
    if (localConfig.firstDate || localConfig.lastDate) {
      dataCases = this._filterCountryCasesByDate(
        dataCases,
        localConfig.firstDate,
        localConfig.lastDate
      );
    }

    // Verifica se é necessário returar os dados do ultimo para o primeiro
    if (localConfig.reverse) {
      return dataCases.reverse();
    } else {
      return dataCases;
    }
  },

  /** "Metodo que filtra os dados por datas especificas"
   * @method _filterCountryCasesByDate
   * "Array com os casos de algum determinado país"
   * @param {Array with Objects} dataCases
   * "String com a data inícial para o filtro"
   * OBS: Se este parâmetro for omitido ou inválido então será filtrado da
   * primeira data ate a data do parâmetro "lastDate"
   * @param {String} firstDate
   * "String com a data final para o filtro"
   * OBS: Se este parâmetro for omitido ou inválido então será filtrado da
   * data do parâmetro "firstDate" até a data atual
   * @param {String} lastDate
   * "JSON com os dados filtrados"
   * @return {Array with Objects}
   */
  _filterCountryCasesByDate(caseData, firstDate, lastDate) {
    // Definindo data padrão para o caso de não houver parâmetro
    if (!firstDate) {
      firstDate = `22/1/2020`;
    }

    if (!lastDate) {
      let todayDate = new Date();
      let todayMonth = todayDate.getMonth() + 1;
      let todayDay = todayDate.getDate();
      let todayYear = todayDate.getFullYear();

      lastDate = `${todayDay - 1}/${todayMonth}/${todayYear}`;
    }

    /****************************************
     * Separando da string o Dia, Mês e ano *
     ****************************************/

    // Separando os valores das datas passadas e convertendo as datas de String para Number
    firstDate = firstDate.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/);
    lastDate = lastDate.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/);
    for (i = 1; i < 4; i++) {
      firstDate[i] = Number(firstDate[i]);
      lastDate[i] = Number(lastDate[i]);
    }

    /*****************************************
     * Iterando em todos os casos de um país *
     *****************************************/
    // OBS: [1] = Dia, [2] = Mês e [3] = Ano

    let result = caseData.filter((value) => {
      // Separando os valores da data do caso atual e convertendo as datas de String para Number
      let caseDate = value.date.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/);
      for (i = 1; i < 4; i++) {
        caseDate[i] = Number(caseDate[i]);
      }

      /****************************************************************************
       * Regras de filtro: Comparar datas de "caseDate", "firstDate" e "lastDate" *
       ****************************************************************************/

      // Caso o ano do "caseDate" seja maior que "firstDate" e menor que "lastDate"
      if (caseDate[3] > firstDate[3] && caseDate[3] < lastDate[3]) {
        return true;

        // Caso o ano do "caseDate" seja o mesmo do "firstDate" e do "lastDate"
      } else if (caseDate[3] == firstDate[3] && caseDate[3] == lastDate[3]) {
        if (caseDate[2] > firstDate[2] && caseDate[2] < lastDate[2]) {
          return true;
        } else if (caseDate[2] == firstDate[2] && caseDate[2] == lastDate[2]) {
          if (caseDate[1] >= firstDate[1] && caseDate[1] <= lastDate[1]) {
            return true;
          } else {
            return false;
          }
        } else if (caseDate[2] == firstDate[2]) {
          if (caseDate[1] >= firstDate[1]) {
            return true;
          } else {
            return false;
          }
        } else if (caseDate[2] == lastDate[2]) {
          if (caseDate[1] <= lastDate[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }

        // Caso o ano do "caseDate" seja o mesmo do "firstDate" e diferente de "lastDate"
      } else if (caseDate[3] == firstDate[3] && caseDate[3] != lastDate[3]) {
        if (caseDate[2] > firstDate[2]) {
          return true;
        } else if (caseDate[2] == firstDate[2]) {
          if (caseDate[1] >= firstDate[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }

        // Caso o ano do "caseDate" seja o mesmo do "lastDate" e diferente de "firstDate"
      } else if (caseDate[3] == lastDate[3] && caseDate[3] != firstDate[3]) {
        if (caseDate[2] < lastDate[2]) {
          return true;
        } else if (caseDate[2] == lastDate[2]) {
          if (caseDate[1] <= lastDate[1]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    });

    return result;
  },

  /** "Metodo que altera o formato da data de "AAAA-MM-DD" para "DD/MM/AAAA"
   * @method _modifyDateFormat
   * "String com a data no formato "AAAA-MM-DDD""
   * @param {String} stringDate
   * "String com a data no formato "DD/MM/AAAA"
   * @return {String}
   */
  _modifyDateFormat(stringDate) {
    // Separando em array o "dia", "mês" e "ano"
    let dateContainerLocal = stringDate.match(
      /([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})/
    );

    return `${dateContainerLocal[3]}/${dateContainerLocal[2]}/${dateContainerLocal[1]}`;
  },

  /** "Metodo que calcula a taxa de crescimento e cria a chave/valor "growthRate"
   * @method _addKeyGrowthRate
   * "Objeto com o caseData anterior (Se este for "false" então será retornado "0"
   * para os valores do "growthRate")"
   * @param {Object} previewCaseData
   * "Objeto com o caseData atual"
   * @param {*Object} currentCaseData
   * "Object com a taxa de crescimento em relação ao dia anterior
   * @return {Object}
   */
  _addKeyGrowthRate(previewCaseData, currentCaseData) {
    let growthRateLocal = {
      confirmed: '0',
      deaths: '0',
      recovered: '0',
    };

    /*****************************************
     * Varificando se os valores são válidos *
     *****************************************/

    // FIX: Impede de vir valores reduzidos
    if (currentCaseData.confirmed < previewCaseData.confirmed) {
      currentCaseData.confirmed = previewCaseData.confirmed;
    }
    if (currentCaseData.deaths < previewCaseData.deaths) {
      currentCaseData.deaths = previewCaseData.deaths;
    }
    if (currentCaseData.recovered < previewCaseData.recovered) {
      currentCaseData.recovered = previewCaseData.recovered;
    }

    // Verifica se existe os dados anterior
    if (!previewCaseData) return growthRateLocal;

    /***********************************
     * Calculando a taxade crescimento *
     ***********************************/

    // Calcula a taxa de crescimento em relação ao dia anterior e aplica a variável "growthRateLocal"
    if (previewCaseData.confirmed != 0) {
      growthRateLocal.confirmed = (
        ((currentCaseData.confirmed - previewCaseData.confirmed) /
          previewCaseData.confirmed) *
        100
      ).toFixed(2);
    } else {
      growthRateLocal.confirmed = '0';
    }
    if (previewCaseData.deaths != 0) {
      growthRateLocal.deaths = (
        ((currentCaseData.deaths - previewCaseData.deaths) /
          previewCaseData.deaths) *
        100
      ).toFixed(2);
    } else {
      growthRateLocal.deaths = '0';
    }
    if (previewCaseData.recovered != 0) {
      growthRateLocal.recovered = (
        ((currentCaseData.recovered - previewCaseData.recovered) /
          previewCaseData.recovered) *
        100
      ).toFixed(2);
    } else {
      growthRateLocal.recovered = '0';
    }

    return growthRateLocal;
  },

  /** "Metodo que calcula a quantidade de novos registros daquele dia e
   * cria a chave/valor "in24HoursLocal"
   * @method _addKeyIn24HoursLocal
   * "Objeto com o caseData anterior (Se este for "false" então será retornado "0"
   * para os valores do "in24HoursLocal")"
   * @param {Object} previewCaseData
   * "Objeto com o caseData atual"
   * @param {*Object} currentCaseData
   * "Object com a taxa de crescimento em relação ao dia anterior
   * @return {Object}
   */
  _addKeyIn24HoursLocal(previewCaseData, currentCaseData) {
    let in24HoursLocal = {
      confirmed: '0',
      deaths: '0',
      recovered: '0',
    };

    /*****************************************
     * Varificando se os valores são válidos *
     *****************************************/

    // FIX: Impede de vir valores reduzidos
    if (currentCaseData.confirmed < previewCaseData.confirmed) {
      currentCaseData.confirmed = previewCaseData.confirmed;
    }
    if (currentCaseData.deaths < previewCaseData.deaths) {
      currentCaseData.deaths = previewCaseData.deaths;
    }
    if (currentCaseData.recovered < previewCaseData.recovered) {
      currentCaseData.recovered = previewCaseData.recovered;
    }

    /********************************************************
     * Calculando quantos novos registros houve em cada dia *
     ********************************************************/

    // Verifica se existe os dados anterior
    if (previewCaseData) {
      // Novos registros das ultimas 24 Horas
      in24HoursLocal = {
        confirmed: currentCaseData.confirmed - previewCaseData.confirmed,
        deaths: currentCaseData.deaths - previewCaseData.deaths,
        recovered: currentCaseData.recovered - previewCaseData.recovered,
      };
    } else {
      in24HoursLocal = {
        confirmed: currentCaseData.confirmed,
        deaths: currentCaseData.deaths,
        recovered: currentCaseData.recovered,
      };
    }

    return in24HoursLocal;
  },
};
