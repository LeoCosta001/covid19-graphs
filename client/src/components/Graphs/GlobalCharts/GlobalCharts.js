// Componentes
import GlobalMapApp from '@/components/Graphs/GlobalCharts/GlobalMap/GlobalMapApp.vue';
import GlobalRankApp from '@/components/Graphs/GlobalCharts/GlobalRankApp/GlobalRankApp.vue';

// Métodos
import _date from '@/methods/changeDate/dateIdentify.js';

// Configurações do componente
export default {
  name: 'GlobalCharts',
  components: {
    GlobalMapApp,
    GlobalRankApp
  },
  data() {
    return {
      reqResult: {
        data: [],
        selectedValues: {
          selectDataType: {
            dataType: '',
            dataTypeTranslated: ''
          },
          selectDate: {
            firstDate: _date.calcDate(-2, false),
            lastDate: _date.calcDate(-1, false),
          },
          selectInfo: {
            globalMap: true,
            countriesRank: true,
            globalSummary: true,
          }
        },
      },
    };
  },
  methods: {
    // Atualizar dados dos componentes
    attGlobalData(req) {
      this.reqResult = req;
      this.$refs.attGlobalMapApp.attGlobalMap(req);
      this.$refs.attGlobalRankApp.attGlobalRank(req);
    },
  },
};
