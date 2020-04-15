/* eslint-disable */
module.exports = {
    /* Filtra o JSON com base nas datas informadas
    * Valores válidos:
    *       - myJSON = JSON que contém todos os dados do país que será exibido (Já mapeado).
    *       - firstDay = String (Representa a data inícial, deverá conter a data neste formato "2/4/2020").
    *       - lastDay = String (Representa a data final, deverá conter a data neste formato "3/4/2020").
    * Retorno: JSON com os index filtrados entre asdatas indicadas */
    showIndex(myJSON, indexMinQnt, indexMaxQnt) {
        let firstDay = myJSON.findIndex(i => i.date == indexMinQnt);
        let lastDay = myJSON.findIndex(i => i.date == indexMaxQnt);
        let filterIndexQnt = myJSON.filter((value, index) => index <= firstDay && index >= lastDay);
        //let filterIndexQnt = myJSON.filter((value, index) => index >= parseInt(indexMinQnt) && index < parseInt(indexMaxQnt));
        return filterIndexQnt;
    }
}