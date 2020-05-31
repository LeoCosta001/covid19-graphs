// Metodos
import _date from "@/methods/changeDate/dateIdentify.js";

export default {
  name: "SelectDateForGlobalDataOptions",
  data() {
    return {
      // Datas inválidas
      invalidDate: false,

      // Placeholder com as datas iniciais
      lastDatePlaceholder: _date.calcDate(-1, false),
      maxDate: _date.calcDate(-1, false),

      // Dados do calendário
      lastDate: {
        selectedDate: _date.calcDate(-1, false)
      }
    };
  },
  computed: {
    SelectDateEmit() {
      return {
        invalidStatus: this.invalidDate,
        firstDate: "21/1/2020",
        lastDate: this.lastDate.selectedDate
      };
    }
  },
  methods: {
    // Emitir dados que estiverem no data "SelectDateEmit"
    localEmit() {
      this.$emit("SelectDate_return", this.SelectDateEmit);
    },

    checkDate() {
      this.localEmit();
    },

    resetValue() {
      // Placeholder com as datas iniciais
      this.lastDatePlaceholder = _date.calcDate(-1, false);

      // Dados do calendário
      this.lastDate.selectedDate = _date.calcDate(-1, false);

      this.checkDate();
    }
  }
};
