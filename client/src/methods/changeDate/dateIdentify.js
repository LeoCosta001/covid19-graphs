/* eslint-disable */
module.exports = {
  /* Compara os valores de duas datas no formato "dd/mm/aaaa" para saber qual é menor e qual é maior.
   * Valores válidos:
   *       - dateMin = String (Data no formato "dd/mm/aaaa").
   *       - dateMax = String (Data no formato "dd/mm/aaaa").
   * Retorno: Boolean (True para caso o "dateMin" seja menor que o "dateMax") */
  compareDate(dateMin, dateMax) {
    // Separando as datas de Dia Mês e Ano da string
    let minDateContainer = dateMin.match(
      /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/
    );
    let maxDateContainer = dateMax.match(
      /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/
    );

    // Retirando a primeira posição da array
    minDateContainer.shift();
    maxDateContainer.shift();

    // Converter posições de String para Numbers
    minDateContainer.forEach((value, index) => {
      minDateContainer[index] = parseInt(value);
    });
    maxDateContainer.forEach((value, index) => {
      maxDateContainer[index] = parseInt(value);
    });

    // Comparando valores para saber se o minDate é menor que o maxDate
    // Verificar se o ano do "minDate" é menor que o ano do "maxDate"
    if (minDateContainer[2] < maxDateContainer[2]) {
      return true;
    }
    // Caso os anos sejam os mesmos entao verificar se o mês do minDate é menor que o do maxDate
    if (minDateContainer[2] == maxDateContainer[2]) {
      if (minDateContainer[1] < maxDateContainer[1]) {
        return true;
      }

      if (minDateContainer[1] == maxDateContainer[1]) {
        if (minDateContainer[0] < maxDateContainer[0]) {
          return true;
        }
      }
    }
  },

  /* Retorna uma data especifica com base na quantidade de dias passados pelo parametro.
   * Valores aceitos:
   *     - dayNumber = NUMBER (Números positivos para calcular próximas datas e negativos para datas anteriores).
   *     - twoDigits = BOOLEAN (O valor deve ser True para o retorno ser "04/04/2020" ao invés de "4/4/2020").
   * Retorno: STRING (Ex: "13/4/2020" ou "13/04/2020"). */
  calcDate(dayNumber, twoDigits) {
    var lastWeek = this.newCalcDate(dayNumber);
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();

    // Verifica se o retorno deverá ser "04/04/2020" ao invés de "4/4/2020"
    if (!twoDigits) {
      // Data sem o zero "0" nos números que contém 1 digito
      let lastWeekDisplay =
        lastWeekDay + "/" + lastWeekMonth + "/" + lastWeekYear;
      return lastWeekDisplay;
    } else {
      // Data com o zero "0" nos números que contém 1 digito
      let lastWeekDisplayPadded =
        ("00" + lastWeekDay.toString()).slice(-2) +
        "/" +
        ("00" + lastWeekMonth.toString()).slice(-2) +
        "/" +
        ("0000" + lastWeekYear.toString()).slice(-4);
      return lastWeekDisplayPadded;
    }
  },
  /* Retorna a data com os dias alterados (OBS: Este é um método interno).
   * Valores aceitos:
   *       - dayNumber = NUMBER (Quantidade de dias que vai ser calculado).
   * Retorno: Data completa com os dias alterados (Ex: "7 dias atrás: Wed Apr 08 2020 00:00:00 GMT-0300 (Horário Padrão de Brasília)")*/
  newCalcDate(dayNumber) {
    var today = new Date();
    var lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + dayNumber
    );
    return lastWeek;
  },
};
