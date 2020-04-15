/* eslint-disable */
module.exports = {
  /* Descrição: Alterar o formado da data do JSON de 2020-4-2 para 2/4/2020.
   *Valor aceito em "reqJson":
   *     - Arquivo JSON com as propriedades "data", "confirmed", "deaths" e "recovered".
   *Retuno: O mesmo JSON porém com o formato de data alterado e acrescentado a propriedade "growthRate"*/
  init(reqJson) {
    return reqJson.map((value, index) => {
      let previousIndex = reqJson[index + 1];
      // Criação das novas propriedades "growthRate" e "in24Hours"
      let growthRateLocal = {
        confirmed: 0,
        deaths: 0,
        recovered: 0
      };

      let in24HoursLocal = {
        confirmed: 0,
        deaths: 0,
        recovered: 0
      };

      // Inverter data
      let dateContainerLocal = value.date.match(
        /([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})/
      );
      let dateInverseLocal = `${dateContainerLocal[3]}/${dateContainerLocal[2]}/${dateContainerLocal[1]}`;

      // Aplicando novos valores
      if (index != reqJson.length - 1) {
        
        // FIX: Impede de vir valores reduzidos do banco de dados
        if(value.confirmed < previousIndex.confirmed) {
          value.confirmed = previousIndex.confirmed;
        };
        if(value.deaths < previousIndex.deaths) {
          value.deaths = previousIndex.deaths;
        };
        if(value.recovered < previousIndex.recovered) {
          value.recovered = previousIndex.recovered;
        };
 
        // Calculando a taxa de crescimento em relação ao dia anterior
        if(previousIndex.confirmed != 0) {
          growthRateLocal.confirmed = (((value.confirmed - previousIndex.confirmed) / previousIndex.confirmed) * 100).toFixed(2);
        } else {
          growthRateLocal.confirmed = 0;
        }
        if(previousIndex.deaths != 0) {
          growthRateLocal.deaths = (((value.deaths - previousIndex.deaths) / previousIndex.deaths) * 100).toFixed(2);
        } else {
          growthRateLocal.deaths = 0;
        }
        if(previousIndex.recovered != 0) {
          growthRateLocal.recovered = (((value.recovered - previousIndex.recovered) / previousIndex.recovered) * 100).toFixed(2);
        } else {
          growthRateLocal.recovered = 0;
        }

        // Novos registros das ultimas 24 Horas
        in24HoursLocal = {
          confirmed: value.confirmed - previousIndex.confirmed,
          deaths: value.deaths - previousIndex.deaths,
          recovered: value.recovered - previousIndex.recovered
        };
      } else {
        // Novos registros nas ultimas 24 Horas (OBS: Este é para o ultimo registro da lista)
        in24HoursLocal = {
          confirmed: value.confirmed,
          deaths: value.deaths,
          recovered: value.recovered
        };
      }

      // Retorno
      return {
        date: dateInverseLocal,
        confirmed: value.confirmed,
        deaths: value.deaths,
        recovered: value.recovered,
        growthRate: growthRateLocal,
        in24Hours: in24HoursLocal
      };
    });
  }
};
