// Métodos
import _graphLine from "@/methods/graphs/graphLine.js";

// APIs
import VueCharts from "vue-chartjs";

export default {
  extends: VueCharts.Line,
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
              backgroundColor: "rgba(241, 196, 15, 0.100)",
              data: this.countryDataForGraph.in24Hours.confirmed,
              lineTension: 0,
            },
            {
              label: "Mortos",
              borderColor: "#E74C3C",
              backgroundColor: "rgba(231, 77, 60, 0.100)",
              data: this.countryDataForGraph.in24Hours.deaths,
              lineTension: 0,
            },
            {
              label: "Recuperados",
              borderColor: "#2ECC71",
              backgroundColor: "rgba(46, 204, 112, 0.100)",
              data: this.countryDataForGraph.in24Hours.recovered,
              lineTension: 0,
            },
          ],
        },
        _graphLine.option.default(true)
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
        this.countryDataForGraph.in24Hours.confirmed.unshift(value.in24Hours.confirmed);
        this.countryDataForGraph.in24Hours.deaths.unshift(value.in24Hours.deaths);
        this.countryDataForGraph.in24Hours.recovered.unshift(value.in24Hours.recovered);
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
      _graphLine.option.default(false)
    );
  },
};
