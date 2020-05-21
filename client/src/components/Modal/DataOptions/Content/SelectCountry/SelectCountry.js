// Apollo Client
import { client } from '@/apolloConfig/apollo-client';
import gql from 'graphql-tag';

export default {
  name: 'SelectCountry',
  data() {
    return {
      countryList: false,
      countrySelected: 'undefined',
      invalidStatus: false,
    };
  },
  computed: {
    SelectCountryEmit() {
      return {
        countrySelected: this.countrySelected,
        invalidStatus: this.invalidStatus,
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
    let query = gql`
      query {
        case {
          country
        }
      }
    `;

    client
      .query({ query })
      .then((res) => {
        this.countryList = res.data.case;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
