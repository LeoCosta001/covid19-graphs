// APIs
import { FunctionalCalendar } from "vue-functional-calendar";
// Métodos
import _date from "@/methods/changeDate/dateIdentify.js";

// Configurações do componente
export default {
  name: "TABLE_CountryData",
  components: {
    FunctionalCalendar
  },
  props: {
    countryData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      // Variáves
      maxSelectDataNumber: "7 ",
      minSelectDataNumber: "0",
      // Controladores de display
      inputTableDataNumberInvalid: false,
      tableLineDetailStatus: undefined,
      // Calendário
      maxDayPlaceholder: _date.calcDate(-1, false),
      minDayPlaceholder: _date.calcDate(-7, false),
      maxLimit: _date.calcDate(-1, false),
      calendarMaxDay: {
        selectedDate: _date.calcDate(-1, false)
      },
      calendarMinDay: {
        selectedDate: _date.calcDate(-7, false)
      }
    };
  },
  computed: {
    // Dados para serem emitidos para outros componentes
    TABLE_CountryDataEmit() {
      return {
        selectDataNumber: {
          min: this.minSelectDataNumber,
          max: this.maxSelectDataNumber
        }
      };
    }
  },
  methods: {
    // Emitir dados que estiverem no data "TABLE_CountryDataEmit"
    localEmit() {
      this.$emit("selectTableDataNumber", this.TABLE_CountryDataEmit);
    },

    // Ativado quando é alterada as datas para a exibição de dados
    attTableData() {
      // Verifica se a data Min é menor que o data Max
      if (
        _date.compareDate(
          this.calendarMinDay.selectedDate,
          this.calendarMaxDay.selectedDate
        )
      ) {
        // Desativando mensagem de data invalida
        this.inputTableDataNumberInvalid = false;

        // Alterando valores que serão emitidos
        this.maxSelectDataNumber = this.calendarMaxDay.selectedDate;
        this.minSelectDataNumber = this.calendarMinDay.selectedDate;

        // Fechando a tabela
        this.tableLineDetail(-1);

        this.localEmit();
      } else {
        this.inputTableDataNumberInvalid = true;
      }
    },

    // Abrindo linha de informações detalhadas da tabela
    tableLineDetail(index) {
      if (this.tableLineDetailStatus == index) {
        this.tableLineDetailStatus = undefined;
      } else {
        this.tableLineDetailStatus = index;
      }
    }
  }
};
