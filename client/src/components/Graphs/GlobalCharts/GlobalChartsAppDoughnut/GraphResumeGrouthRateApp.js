// Métodos
import _graphDoughnut from "@/methods/graphs/graphDoughnut.js";

// APIs
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Doughnut,
  name: "GraphResumeGrouthRateForGlobalCharts",
  data() {
    return {
      totalIndexNumber: 0,
      firstPosition: {
        confirmed: 0,
        deaths: 0,
        recovered: 0
      },
      countryDataForGraph: {
        date: [],
        confirmed: [],
        deaths: [],
        recovered: [],
        growthRate: {
          confirmed: [],
          deaths: [],
          recovered: []
        },
        in24Hours: {
          confirmed: [],
          deaths: [],
          recovered: []
        }
      }
    };
  },
  methods: {
    attGraph(countryData) {
      // Atualizar dados da variavel "countryDataForGraph"
      let reqCountryData = countryData.data.cases;
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
              backgroundColor: [
                "rgba(241, 196, 15, 0.750)",
                "rgba(231, 77, 60, 0.750)",
                "rgba(46, 204, 112, 0.750)"
              ],
              hoverBackgroundColor: ["#F1C40F", "#E74C3C", "#2ECC71"],
              data: [
                this.countryDataForGraph.in24Hours.confirmed,
                this.countryDataForGraph.in24Hours.deaths,
                this.countryDataForGraph.in24Hours.recovered
              ]
            }
          ]
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
          recovered: []
        },
        in24Hours: {
          confirmed: 0,
          deaths: 0,
          recovered: 0
        }
      };

      // Adicionar novos valores
      data.forEach(value => {
        this.countryDataForGraph.in24Hours.confirmed +=
          value.in24Hours.confirmed;
        this.countryDataForGraph.in24Hours.deaths += value.in24Hours.deaths;
        this.countryDataForGraph.in24Hours.recovered +=
          value.in24Hours.recovered;
      });
    }
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
            data: [-1, -1, -1]
          }
        ]
      },
      _graphDoughnut.option.default
    );
  }
};
