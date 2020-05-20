import casesList from '@/axiosConfig/countryList';

export default {
  name: 'SelectCountry',
  data() {
    return {
      countryList: false,
      countrySelected: 'undefined',
      invalidStatus: false
    };
  },
  computed: {
    SelectCountryEmit() {
      return {
        countrySelected: this.countrySelected,
        invalidStatus: this.invalidStatus
      };
    },
  },
  methods: {
    // Emitir dados que estiverem no data "countrySelected"
    localEmit() {
      this.$emit('SelectCountry_return', this.SelectCountryEmit);
    },

    // Emite o nome do país selecionado
    selectCountryAtt() {
      this.localEmit();
    },
  },
  mounted() {
    // Lista do nome dos países
    casesList.toList().then((res) => {
      this.countryList = res.data;
    });
  },
};
