// Metodos
import _addPoints from '@/methods/changeData/addPoints';

// Componentes
import GlobalSummaryAppDoughnut from '@/components/Graphs/GlobalCharts/GlobalChartsAppDoughnut/GlobalSummaryAppDoughnut';

export default {
  name: 'GlobalSummary',
  components: {
    GlobalSummaryAppDoughnut,
  },
  data() {
    return {
      totalValue: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
      valueWithPoints: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
      percentageValue: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
    };
  },
  methods: {
    // Atualizar os dados que serão exibidos
    attGlobalSummary(req) {
      this.totalValue = {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      };

      // Soma dos valores
      req.data.forEach((value) => {
        this.totalValue.confirmed += value.casesSummary.confirmed;
        this.totalValue.deaths += value.casesSummary.deaths;
        this.totalValue.recovered += value.casesSummary.recovered;
      });

      // Adicionando pontos a cada 3 números
      this.valueWithPoints = {
        confirmed: _addPoints.init(this.totalValue.confirmed),
        deaths: _addPoints.init(this.totalValue.deaths),
        recovered: _addPoints.init(this.totalValue.recovered),
      };

      // Adicionando valores de porcentagem
      let totalValue =
        this.totalValue.confirmed +
        this.totalValue.deaths +
        this.totalValue.recovered;
        
      this.percentageValue = {
        confirmed: ((this.totalValue.confirmed / totalValue) * 100).toFixed(2),
        deaths: ((this.totalValue.deaths / totalValue) * 100).toFixed(2),
        recovered: ((this.totalValue.recovered / totalValue) * 100).toFixed(2),
      };

      this.attgraphDoughnut();
    },

    // Atualizar gráfico de Doughnut
    attgraphDoughnut() {
      this.$refs.attGlobalSummaryAppDoughnut.attGraph(this.totalValue);
    },
  },
};
