// Métodos
import _graphBar from "@/methods/graphs/graphBar.js";

// APIs
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Bar,
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
          labels: this.countryDataForGraph.date,
          datasets: [
            {
              label: "Casos Confirmados",
              borderColor: "#F1C40F",
              hoverBorderColor: "##F1C40F",
              backgroundColor: "rgba(241, 196, 15, 0.5)",
              hoverBackgroundColor: "#F1C40F",
              borderWidth: 2,
              data: this.countryDataForGraph.growthRate.confirmed,
              lineTension: 0,
            },
            {
              label: "Mortos",
              borderColor: "#E74C3C",
              hoverBorderColor: "##E74C3C",
              backgroundColor: "rgba(231, 77, 60, 0.5)",
              hoverBackgroundColor: "#E74C3C",
              borderWidth: 2,
              data: this.countryDataForGraph.growthRate.deaths,
              lineTension: 0,
            },
            {
              label: "Recuperados",
              borderColor: "#2ECC71",
              hoverBorderColor: "##2ECC71",
              backgroundColor: "rgba(46, 204, 112, 0.5)",
              hoverBackgroundColor: "#2ECC71",
              borderWidth: 2,
              data: this.countryDataForGraph.growthRate.recovered,
              lineTension: 0,
            },
          ],
        },
        _graphBar.option.default(true)
      );

    },
    attVariable_CountryDataForGraph(data) {
      // Resetar valores antigos
      this.countryDataForGraph = {
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

      // Adicionar novos valores
      data.forEach((value) => {
        this.countryDataForGraph.date.unshift(value.date);
        this.countryDataForGraph.growthRate.confirmed.unshift(value.growthRate.confirmed);
        this.countryDataForGraph.growthRate.deaths.unshift(value.growthRate.deaths);
        this.countryDataForGraph.growthRate.recovered.unshift(value.growthRate.recovered);
      });
    },
  },
  mounted() {
    // Renderização inicial do Gráfico
    this.renderChart(
      {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: "transparent",
            data: [],
          },
        ],
      },
      _graphBar.option.default(false)
    );
  },
};
