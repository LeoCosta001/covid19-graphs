// Métodos
import _graphDoughnut from "@/methods/graphs/graphDoughnut.js";

// APIs
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Doughnut,
  props: {
    countryData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      totalIndexNumber: 0,
      firstPosition: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
      countryDataForGraph: {
        date: [],
        confirmed: [],
        deaths: [],
        recovered: [],
        growthRate: {
          confirmed: [],
          deaths: [],
          recovered: [],
        },
        in24Hours: {
          confirmed: [],
          deaths: [],
          recovered: [],
        },
      },
    };
  },
  computed: {
    // Dados para serem emitidos para outros componentes
    GraphDataEmit() {
      return {
        graphData: this.countryDataForGraph,
      };
    },
  },
  methods: {
    // Emitir dados que estiverem no data "FORM_SelectCountryEmit"
    localEmit() {
      this.$emit("resGraphDataEmit", this.GraphDataEmit);
    },
    attGraph() {
      // Atualizar dados da variavel "countryDataForGraph"
      let reqCountryData = this.countryData.countryData();
      this.attVariable_CountryDataForGraph(reqCountryData);

      // Renderização do gráfico atualizado
      this.renderChart(
        {
          labels: ["Casos Confirmados", "Mortos", "Recurados"],
          datasets: [
            {
              label: "Casos Confirmados",
              borderColor: "#2C3E50",
              hoverBorderColor: "#2C3E50",
              borderWidth: 3,
              backgroundColor: ["rgba(241, 196, 15, 0.750)", "rgba(231, 77, 60, 0.750)", "rgba(46, 204, 112, 0.750)"],
              hoverBackgroundColor: ["#F1C40F", "#E74C3C", "#2ECC71"],
              data: [
                this.countryDataForGraph.confirmed,
                this.countryDataForGraph.deaths,
                this.countryDataForGraph.recovered,
              ],
            },
          ],
        },
        _graphDoughnut.option.default
      );
    },
    // Método usado para atualizar os valores que seram exibidos no gráfico de Doughnut
    attVariable_CountryDataForGraph(data) {
      // Resetar valores antigos
      this.totalIndexNumber = 0;
      this.firstPosition.confirmed = 0;
      this.firstPosition.deaths = 0;
      this.firstPosition.recovered = 0;
      this.countryDataForGraph = {
        totalIndexNumber: 0,
        date: [],
        confirmed: [],
        deaths: [],
        recovered: [],
        growthRate: {
          confirmed: [],
          deaths: [],
          recovered: [],
        },
        in24Hours: {
          confirmed: [],
          deaths: [],
          recovered: [],
        },
      };

      // Criar container de valores
      data.forEach((value) => {
        this.totalIndexNumber += 1;
        this.countryDataForGraph.confirmed.unshift(value.confirmed);
        this.countryDataForGraph.deaths.unshift(value.deaths);
        this.countryDataForGraph.recovered.unshift(value.recovered);

        // Pegando o valor do ultimo array
        if (value.date == data[data.length - 1].date) {
          this.firstPosition.confirmed = value.in24Hours.confirmed;
          this.firstPosition.deaths = value.in24Hours.deaths;
          this.firstPosition.recovered = value.in24Hours.recovered;
        }
      });

      // Encurtando Objetos
      let localData = {
        /* OBS: Nas propriedades que contém o valor da ultima posição é somado ao valor da primeira posição
        * porque a primeira posição não esta no "this.countryDataForGraph.????[0]".
        * OBS: Não esta sendo usado o método .reduce() porque ainda é necesário o valor da primeira e
        * utima posição para calcular a taxa de crescimento em porcentagem. */
        lastConfirmed: this.countryDataForGraph.confirmed[this.totalIndexNumber - 1] + this.firstPosition.confirmed,
        firstConfirmed: this.countryDataForGraph.confirmed[0],
        lastDeaths: this.countryDataForGraph.deaths[this.totalIndexNumber - 1] + this.firstPosition.deaths,
        firstDeaths: this.countryDataForGraph.deaths[0],
        lastRecovered: this.countryDataForGraph.recovered[this.totalIndexNumber - 1] + this.firstPosition.recovered,
        firstRecovered: this.countryDataForGraph.recovered[0]
      };

      // Calculo para o gráfico de Doughnut (Soma de todos os novos registros)
      this.countryDataForGraph.confirmed = localData.lastConfirmed - localData.firstConfirmed;
      this.countryDataForGraph.deaths = localData.lastDeaths - localData.firstDeaths;
      this.countryDataForGraph.recovered = localData.lastRecovered - localData.firstRecovered;

      // Calcular Taxa de Crescimento (em %) em relação á primeira e ultima data selecionada
      this.countryDataForGraph.growthRate.confirmed = localData.firstConfirmed == 0 ?
      undefined : (((localData.lastConfirmed - localData.firstConfirmed) / localData.firstConfirmed) * 100).toFixed(2);
      this.countryDataForGraph.growthRate.deaths = localData.firstDeaths == 0 ?
      undefined : (((localData.lastDeaths - localData.firstDeaths) / localData.firstDeaths) * 100).toFixed(2);
      this.countryDataForGraph.growthRate.recovered = localData.firstRecovered == 0 ?
      undefined : (((localData.lastRecovered - localData.firstRecovered) / localData.firstRecovered) * 100).toFixed(2);

      // Emitir dados
      this.localEmit();
    },
  },
  mounted() {
    // Renderização inicial do Gráfico
    this.renderChart(
      {
        labels: ["", "", ""],
        datasets: [
          {
            borderColor: "#34495E",
            backgroundColor: "transparent", //["rgba(241, 196, 15, 0.100)", "rgba(231, 77, 60, 0.100)", "rgba(46, 204, 112, 0.100)"],
            data: [-1, -1, -1],
          },
        ],
      },
      _graphDoughnut.option.default
    );
  },
};
