
// Métodos
import _date from "@/methods/changeDate/dateIdentify.js";
import changeData from "@/methods/changeData/changeData.js";
import mapData from "@/methods/changeData/mapData.js";

// Componentes
import FORMSelectCountry from "@/components/Home/FORM_SelectCountry/FORM_SelectCountry.vue";
import TABLECountryData from "@/components/Home/TABLE_CountryData/TABLE_CountryData.vue";

export default {
  name: "Home",
  components: {
    FORMSelectCountry,
    TABLECountryData
  },
  data() {
    return {
      resCountryData: undefined,
      resForTableCountryData: undefined,
      selectTableDataNumber: {
        min: _date.calcDate(-7, false),
        max: _date.calcDate(-1, false)
      }
    };
  },
  methods: {
    // Este metodo é executado quando é selecionado um novo país
    countryData(req) {
      this.resCountryData = req;
      this.tableShowDataNumber();
    },
    // Este método é executado quando é alterado a quantidade de dados exibidos na Tabela
    tableShowDataNumber(req) {
      //this.resCountryData.countryData =
      this.resForTableCountryData = {
        countrySelected: this.resCountryData.countrySelected,
        countryData: () => {
          // Reescrevendo a saida do JSON
          let mapCountryData = mapData.init(this.resCountryData.countryData);
          // Verifica a existencia do parâmetro "req" (OBS: Ele só estará presente caso este método seja executado pelo $emit do componente "TABLECountryData")
          if (req) {
            if (
              req.selectDataNumber.max != this.selectTableDataNumber.max ||
              req.selectDataNumber.min != this.selectTableDataNumber.min
            ) {
              this.selectTableDataNumber = {
                max: req.selectDataNumber.max,
                min: req.selectDataNumber.min
              };
            }
            console.log(
              `Req: ${req.selectDataNumber.max}, final: ${this.selectTableDataNumber.max}`
            );
            return changeData.showIndex(
              mapCountryData,
              req.selectDataNumber.min,
              req.selectDataNumber.max
            );
          } else {
            return changeData.showIndex(
              mapCountryData,
              this.selectTableDataNumber.min,
              this.selectTableDataNumber.max
            );
          }
        },
        countryDataLoading: this.resCountryData.countryDataLoading,
        countryDataErro: this.resCountryData.countryDataErro,
        totalDataNumber: this.resCountryData.countryData.length
      };
    }
  }
};