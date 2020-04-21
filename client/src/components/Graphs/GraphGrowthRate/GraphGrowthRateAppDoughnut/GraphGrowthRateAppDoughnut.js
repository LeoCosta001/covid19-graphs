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
  methods: {
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
              borderColor: "transparent",
              backgroundColor: ["#F1C40F", "#E74C3C", "#2ECC71"], //["rgba(241, 196, 15, 0.100)", "rgba(231, 77, 60, 0.100)", "rgba(46, 204, 112, 0.100)"],
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
      console.log(this.firstPosition.confirmed);

      // Somar valores
      this.countryDataForGraph.confirmed =
        this.countryDataForGraph.confirmed[this.totalIndexNumber - 1] -
        this.countryDataForGraph.confirmed[0] +
        this.firstPosition.confirmed;
      this.countryDataForGraph.deaths =
        this.countryDataForGraph.deaths[this.totalIndexNumber - 1] -
        this.countryDataForGraph.deaths[0] +
        this.firstPosition.deaths;
      this.countryDataForGraph.recovered =
        this.countryDataForGraph.recovered[this.totalIndexNumber - 1] -
        this.countryDataForGraph.recovered[0] +
        this.firstPosition.recovered;
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
