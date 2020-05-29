/* eslint-disable */
module.exports = {
  /** Método usado para colocar pontuação nos números (Ex: "123456789" = "123.456.789")
   * @method init
   * String com uma data no formato "dd/mm/aaaa"
   * @param {*String or Number} myNumber
   * O valore retornado sempre será uma string
   * @return {String}
   */
  init(myNumber) {
    myNumber = `${myNumber}`;
    let addPoints = '';

    for (i = myNumber.length; i > -1; i--) {
      switch (i) {
        case myNumber.length - 4:
          addPoints += `.${[myNumber[i]]}`;
          break;
        case myNumber.length - 7:
          addPoints += `.${[myNumber[i]]}`;
          break;
        case myNumber.length - 10:
          addPoints += `.${[myNumber[i]]}`;
          break;
        case myNumber.length - 13:
          addPoints += `.${[myNumber[i]]}`;
          break;
        default:
          addPoints += [myNumber[i]];
      }
    }

    let result = addPoints
      .split('')
      .reverse()
      .join('');

    return result;
  },
};
