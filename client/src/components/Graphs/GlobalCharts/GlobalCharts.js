// Componentes
import GlobalMapApp from '@/components/Graphs/GlobalCharts/GlobalMap/GlobalMapApp.vue';

// Métodos
import _date from '@/methods/changeDate/dateIdentify.js';

// Apollo Client
import { client } from '@/apolloConfig/apollo-client';
import gql from 'graphql-tag';

// Configurações do componente
export default {
  name: 'GlobalCharts',
  components: {
    GlobalMapApp,
  },
  props: {
    globalData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      reqResult: {
        data: [],
        selectedValues: {
          selectDate: {
            firstDate: _date.calcDate(-2, false),
            lastDate: _date.calcDate(-1, false),
          },
        },
      },
    };
  },
  methods: {
    attGlobalData(req) {
      // Atualizar o mapa global
      this.$refs.attGlobalMapApp.attGlobalMap(req);
    },
  },

  mounted() {
    // Requisição para pegar os dados resumidos ds países
    let query = gql`
      query {
        case(
          firstDate: "${this.reqResult.selectedValues.selectDate.firstDate}",
          lastDate: "${this.reqResult.selectedValues.selectDate.lastDate}"
        ) {
          country
          casesSummary {
            date {
              lastDate
              firstDate
            }
            confirmed
            deaths
            recovered
            growthRate {
              confirmed
              deaths
              recovered
            }
            inBetweenDays {
              confirmed
              deaths
              recovered
            }
          }
        }
      }
    `;

    client
      .query({ query })
      .then((res) => {
        this.reqResult.data = res.data.case;

        // Atualizar componentes
        this.$refs.attGlobalMapApp.attGlobalMap(this.reqResult);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
