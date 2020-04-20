// Métodos
import _date from "@/methods/changeDate/dateIdentify.js";
import changeData from "@/methods/changeData/changeData.js";

// Componentes
import GraphSummary from "@/components/Graphs/GraphSummary/GraphSummary.vue";

export default {
  name: "DataTable",
  components: {
    GraphSummary,
  },
  props: {
    reqCountryData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      resForTableCountryData: undefined,
      selectTableDataNumber: {
        min: _date.calcDate(-7, false),
        max: _date.calcDate(-1, false),
      },
    };
  },
  methods: {
    // Este método é executado quando é alterado a quantidade de dados exibidos na Tabela e quando é alterado o país selecionado
    showDataNumber(req) {
      // Impedir atualização da lista caso o JSON de Dados venha vazio
      if (this.reqCountryData.countryData != undefined) {
        this.resForTableCountryData = {
          countrySelected: this.reqCountryData.countrySelected,
          countryData: () => {
            // Verifica a existencia do parâmetro "req" (OBS: Ele só estará presente caso este método seja executado pelo $emit do componente "TABLECountryData")
            if (req) {
              if (
                req.selectDataNumber.max != this.selectTableDataNumber.max ||
                req.selectDataNumber.min != this.selectTableDataNumber.min
              ) {
                this.selectTableDataNumber = {
                  max: req.selectDataNumber.max,
                  min: req.selectDataNumber.min,
                };
              }
              return changeData.showIndex(
                this.reqCountryData.countryData,
                req.selectDataNumber.min,
                req.selectDataNumber.max
              );
            } else {
              // Atualizando dados dos Gráficos quando é alterado o país selecionado
              this.$refs.attGraphData.attTableData();
              
              return changeData.showIndex(
                this.reqCountryData.countryData,
                this.selectTableDataNumber.min,
                this.selectTableDataNumber.max
              );
            }
          },
          countryDataLoading: this.reqCountryData.countryDataLoading,
          countryDataErro: this.reqCountryData.countryDataErro,
          totalDataNumber: this.reqCountryData.countryData.length,
        };
      }
    },
  },
};
