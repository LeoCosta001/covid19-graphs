/* eslint-disable */
module.exports = {
  /** Método que traduz o nome de um país
   * @method countryName
   * String com o nome do país
   * @param {*String} countryName
   * Se a tradução for encontrada será retornado a tradução do nome do país,
   * mas se a tradução não for encontrada então sera retornado o mesmo nome que foi colocado
   * @return {String or Undefined}
   */
  countryName(countryName) {
    switch (countryName) {
      case 'Congo (Kinshasa)':
        return 'CD';
        break;
      case 'South Sudan':
        return 'SS';
        break;
      case 'Congo (Brazzaville)':
        return 'CG';
        break;
      case "Cote d'Ivoire":
        return 'CI';
        break;
      case 'Uzbekistan':
        return 'UZ';
        break;
      case 'Burma':
        return 'Myanmar';
        break;
      case 'Korea, South':
        return 'South Korea';
        break;
      case 'Czechia':
        return 'CZ';
        break;
      case 'North Macedonia':
        return 'MK';
        break;
      case 'undefined':
        return '';
        break;
      case undefined:
        return '';
        break;
      default:
        return countryName;
    }
  },
};
