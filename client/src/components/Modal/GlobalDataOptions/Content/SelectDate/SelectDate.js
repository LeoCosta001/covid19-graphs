// Metodos
import _date from "@/methods/changeDate/dateIdentify.js";

export default {
  name: "SelectDateForGlobalDataOptions",
  data() {
    return {
      // Datas inválidas
      invalidDate: false,

      // Placeholder com as datas iniciais
      firstDatePlaceholder: _date.calcDate(-7, false),
      lastDatePlaceholder: _date.calcDate(-1, false),
      maxDate: _date.calcDate(-1, false),

      // Dados do calendário
      firstDate: {
        selectedDate: _date.calcDate(-7, false)
      },
      lastDate: {
        selectedDate: _date.calcDate(-1, false)
      }
    };
  },
  computed: {
    SelectDateEmit() {
      return {
        invalidStatus: this.invalidDate,
        firstDate: this.firstDate.selectedDate,
        lastDate: this.lastDate.selectedDate
      };
    }
  },
  methods: {
    // Emitir dados que estiverem no data "SelectDateEmit"
    localEmit() {
      this.$emit("SelectDate_return", this.SelectDateEmit);
    },

    // Verifica se o "firstDate" é menor que o "lastDate"
    checkDate() {
      if (
        _date.compareDate(
          this.firstDate.selectedDate,
          this.lastDate.selectedDate
        )
      ) {
        this.invalidDate = false;
      } else {
        this.invalidDate = true;
      }

      this.localEmit();
    },

    resetValue() {
      // Placeholder com as datas iniciais
      this.firstDatePlaceholder = _date.calcDate(-7, false);
      this.lastDatePlaceholder = _date.calcDate(-1, false);

      // Dados do calendário
      this.firstDate.selectedDate = _date.calcDate(-7, false);
      this.lastDate.selectedDate = _date.calcDate(-1, false);

      this.checkDate();
    }
  }
};
