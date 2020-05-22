/* eslint-disable */
module.exports = {
  /** Método usado dentro do método ".sort()" para organizar uma lista com base nas datas
   * @method init
   * String com uma data no formato "dd/mm/aaaa"
   * @param {*String} currentDate
   * String com uma data no formato "dd/mm/aaaa"
   * @param {*String} nextDate
   * O valor é -1 quando o "currentDate" é menor que o "nextDate"
   * O valor é 1 quando o "currentDate" é maior que o "nextDate"
   * O valor é 0 quando o "currentDate" é igual ao "nextDate"
   * @return {Number}
   */

  init(currentDate, nextDate) {
    // Separando as datas de Dia, Mês e Ano da string
    let currentDateContainer = currentDate.match(
      /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/
    );
    let nextDateContainer = nextDate.match(
      /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})/
    );

    // Retirando a primeira posição da array
    currentDateContainer.shift();
    nextDateContainer.shift();

    // Converter posições de String para Numbers
    currentDateContainer.forEach((value, index) => {
      currentDateContainer[index] = parseInt(value);
    });
    nextDateContainer.forEach((value, index) => {
      nextDateContainer[index] = parseInt(value);
    });

    // Comparando valores para saber se o currentdate é menor que o nextDate
    // Verificar se o ano do "currentdate" é menor que o ano do "nextDate"
    if (currentDateContainer[2] < nextDateContainer[2]) {
      return -1;
    }
    // Caso os anos sejam os mesmos entao verificar se o mês do currentdate é menor que o do nextDate
    if (currentDateContainer[2] == nextDateContainer[2]) {
      if (currentDateContainer[1] < nextDateContainer[1]) {
        return -1;
      }

      if (currentDateContainer[1] == nextDateContainer[1]) {
        if (currentDateContainer[0] < nextDateContainer[0]) {
          return -1;
        }
        if (currentDateContainer[0] == nextDateContainer[0]) {
          return 0;
        }
      }
    }

    return 1;
  },
};
