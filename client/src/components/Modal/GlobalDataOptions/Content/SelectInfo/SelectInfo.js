export default {
  name: "SelectInfoForGlobalDataOptions",
  data() {
    return {
      globalMap_checkbox: true,
      countriesRank_checkbox: true,
      globalSummary_checkbox: true,
      invalidStatus: false
    };
  },
  computed: {
    // Emitir dados que estiverem no data "SelectInfoEmit"
    SelectInfoEmit() {
      return {
        globalMap_checkbox: this.globalMap_checkbox,
        countriesRank_checkbox: this.countriesRank_checkbox,
        globalSummary_checkbox: this.globalSummary_checkbox,
        invalidStatus: this.invalidStatus
      };
    }
  },
  methods: {
    // Emitir dados que estiverem no data "SelectInfoEmit"
    localEmit() {
      this.$emit("SelectInfo_return", this.SelectInfoEmit);
    },

    // Verifica se ao menos 1 das informações esta selecionada
    checkSelectedInfo() {
      this.invalidStatus = false;

      if (
        !this.globalMap_checkbox &&
        !this.countriesRank_checkbox &&
        !this.globalSummary_checkbox
      ) {
        this.invalidStatus = true;
      }
      this.localEmit();
    },
    // Resetar valores
    resetValue() {
      this.globalMap_checkbox = true;
      this.countriesRank_checkbox = true;
      this.globalSummary_checkbox = true;
      this.checkSelectedInfo();
    }
  }
};
