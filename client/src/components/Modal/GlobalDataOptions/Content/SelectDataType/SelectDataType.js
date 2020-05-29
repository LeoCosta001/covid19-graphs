export default {
  name: 'SelectDataTypeForGlobalDataOptions',
  data() {
    return {
      dataType: 'confirmed',
      invalidStatus: false,
    };
  },
  computed: {
    // Emitir dados que estiverem no data "SelectDataTypeEmit"
    SelectDataTypeEmit() {
      return {
        dataType: this.dataType,
        invalidStatus: this.invalidStatus,
      };
    },
  },
  methods: {
    // Emitir dados que estiverem no data "SelectDataTypeEmit"
    localEmit() {
      this.$emit('SelectDataType_return', this.SelectDataTypeEmit);
    },

    // Verifica se ao menos 1 das informações esta selecionada
    attSelectDataType(dataType) {
      this.invalidStatus = false;
      this.dataType = dataType;

      if (!this.dataType) {
        this.invalidStatus = true;
      }
      this.localEmit();
    },

    // Valor alterado pelo manu lateral
    changeValue(newValue) {
      this.dataType = newValue;
    },

    // Resetar valores
    resetValue() {
      this.dataType = 'confirmed';
    },
  },
};
