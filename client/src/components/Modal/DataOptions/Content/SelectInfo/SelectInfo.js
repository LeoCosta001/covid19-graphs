export default {
  name: 'SelectInfo',
  data() {
    return {
      summaryGraph_checkbox: true,
      growthRate_checkbox: true,
      newRegister_checkbox: true,
      summary_checkbox: true,
      additionalInformation_checkbox: true,
      invalidStatus: false,
    };
  },
  computed: {
    // Emitir dados que estiverem no data "SelectInfoEmit"
    SelectInfoEmit() {
      return {
        summaryGraph_checkbox: this.summaryGraph_checkbox,
        growthRate_checkbox: this.growthRate_checkbox,
        newRegister_checkbox: this.newRegister_checkbox,
        summary_checkbox: this.summary_checkbox,
        additionalInformation_checkbox: this.additionalInformation_checkbox,
        invalidStatus: this.invalidStatus,
      };
    },
  },
  methods: {
    // Emitir dados que estiverem no data "SelectInfoEmit"
    localEmit() {
      this.$emit('SelectInfo_return', this.SelectInfoEmit);
    },

    // Verifica se ao menos 1 das informações esta selecionada
    checkSelectedInfo() {
      this.invalidStatus = false;

      if (
        !this.summaryGraph_checkbox &&
        !this.growthRate_checkbox &&
        !this.newRegister_checkbox &&
        !this.summary_checkbox &&
        !this.additionalInformation_checkbox
      ) {
        this.invalidStatus = true;
      }
      this.localEmit();
    },
    // Resetar valores
    resetValue() {
      this.summaryGraph_checkbox = true;
      this.growthRate_checkbox = true;
      this.newRegister_checkbox = true;
      this.summary_checkbox = true;
      this.additionalInformation_checkbox = true;
      this.checkSelectedInfo();
    },
  },
};
