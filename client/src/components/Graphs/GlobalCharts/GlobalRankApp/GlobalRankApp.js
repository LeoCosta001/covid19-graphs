// Metodos
import _addPoints from '@/methods/changeData/addPoints';
import _translation from '@/methods/translation/translation';

// Componentes
import GlobalRankAppDoughnut from '@/components/Graphs/GlobalCharts/GlobalChartsAppDoughnut/GlobalRankAppDoughnut';

// APIs
import { GChart } from 'vue-google-charts';

// Configurações do componente
export default {
  name: 'GlobalRankApp',
  components: {
    GChart,
    GlobalRankAppDoughnut,
  },
  data() {
    return {
      newGlobalRankData: [],
      countryRankSelected: {
        countrySelected: '',
        countryTranslateSelected: '',
      },
      totalValue: {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      },
    };
  },
  computed: {},
  methods: {
    // Atualizar dados do rank global
    attGlobalRank(req) {
      let rankSort = undefined;

      // Organizando lista de rank de acordo com os tipos de dados selecionados
      switch (req.selectedValues.selectDataType.dataType) {
        case 'confirmed':
          rankSort = req.data.sort((currentValue, nextValue) => {
            return (
              nextValue.casesSummary.confirmed -
              currentValue.casesSummary.confirmed
            );
          });
          break;
        case 'deaths':
          rankSort = req.data.sort((currentValue, nextValue) => {
            return (
              nextValue.casesSummary.deaths - currentValue.casesSummary.deaths
            );
          });
          break;
        case 'recovered':
          rankSort = req.data.sort((currentValue, nextValue) => {
            return (
              nextValue.casesSummary.recovered -
              currentValue.casesSummary.recovered
            );
          });
          break;
      }

      // Traduzindo o nome dos países e adicionando a poncentagem
      this.totalValue = {
        confirmed: 0,
        deaths: 0,
        recovered: 0,
      };

      rankSort.forEach((value) => {
        this.totalValue.confirmed += value.casesSummary.confirmed;
        this.totalValue.deaths += value.casesSummary.deaths;
        this.totalValue.recovered += value.casesSummary.recovered;
      });

      let result = {
        data: rankSort.map((value) => {
          return {
            casesSummary: value.casesSummary,
            country: value.country,
            countryTranslated: _translation.countryName(value.country),
            globalPercentage: {
              confirmed: (
                (value.casesSummary.confirmed / this.totalValue.confirmed) *
                100
              ).toFixed(2),
              deaths: (
                (value.casesSummary.deaths / this.totalValue.deaths) *
                100
              ).toFixed(2),
              recovered: (
                (value.casesSummary.recovered / this.totalValue.recovered) *
                100
              ).toFixed(2),
            },
            valueWithPoints: {
              confirmed: _addPoints.init(value.casesSummary.confirmed),
              deaths: _addPoints.init(value.casesSummary.deaths),
              recovered: _addPoints.init(value.casesSummary.recovered),
            },
          };
        }),
        selectedValues: req.selectedValues,
      };

      this.newGlobalRankData = result;

      // Atualizando o gráfico de Doughnut
      this.attgraphDoughnut(
        result.data[0].country,
        result.data[0].countryTranslated
      );
    },

    // Atualizar gráfico de Doughnut
    attgraphDoughnut(countrySelected, countryTranslateSelected) {
      this.countryRankSelected = {
        countrySelected: countrySelected,
        countryTranslateSelected: countryTranslateSelected,
      };

      let newData = this.newGlobalRankData.data.filter((value) => {
        return value.country == countrySelected;
      });

      // Separar dados do país selecionado
      this.$refs.attGlobalRankAppDoughnut.attGraph(newData[0]);
    },
  },
};
