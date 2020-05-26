// Apollo Client
import { client } from "@/apolloConfig/apollo-client";
import gql from "graphql-tag";

// Métodos
import _translation from "@/methods/translation/translation";

export default {
  name: "SelectCountryForGlobalDataOptions",
  data() {
    return {
      countryList: false,
      countrySelected: "undefined",
      invalidStatus: false
    };
  },
  computed: {
    SelectCountryEmit() {
      return {
        countrySelected: this.countrySelected,
        countrySelectedTranslated: _translation.countryName(
          this.countrySelected
        ),
        invalidStatus: this.invalidStatus
      };
    }
  },
  methods: {
    // Emitir dados que estiverem no data "countrySelected"
    localEmit() {
      this.$emit("SelectCountry_return", this.SelectCountryEmit);
    },

    // Emite o nome do país selecionado
    selectCountryAtt() {
      this.invalidStatus = this.countrySelected == "undefined" ? true : false;
      this.localEmit();
    },

    // Resetar valores
    resetValue() {
      this.countrySelected = "undefined";
      this.selectCountryAtt();
    }
  },
  mounted() {
    // Requisição para criar a lista de países no "select"
    let query = gql`
      query {
        case {
          country
        }
      }
    `;

    client
      .query({ query })
      .then(res => {
        // Criando a Key "countryTranslation" que contêm o nome traduzido do país
        this.countryList = res.data.case.map(value => {
          return {
            country: value.country,
            countryTranslation: _translation.countryName(value.country)
          };
        });

        // Organizando lista em ordem alfabética
        this.countryList.sort((currentWord, nextWord) => {
          currentWord = currentWord.countryTranslation;
          nextWord = nextWord.countryTranslation;

          currentWord = currentWord.replace(/[ÀÁÂÃÄÅ]/, "A");
          currentWord = currentWord.replace(/[àáâãäå]/, "a");
          currentWord = currentWord.replace(/[ÈÉÊË]/, "E");
          currentWord = currentWord.replace(/[èéêë]/, "e");
          currentWord = currentWord.replace(/[ÌÍÎÏ]/, "I");
          currentWord = currentWord.replace(/[ìíîï]/, "i");
          currentWord = currentWord.replace(/[Ç]/, "C");
          currentWord = currentWord.replace(/[ç]/, "c");

          nextWord = nextWord.replace(/[ÀÁÂÃÄÅ]/, "A");
          nextWord = nextWord.replace(/[àáâãäå]/, "a");
          nextWord = nextWord.replace(/[ÈÉÊË]/, "E");
          nextWord = nextWord.replace(/[èéêë]/, "e");
          nextWord = nextWord.replace(/[ÌÍÎÏ]/, "I");
          nextWord = nextWord.replace(/[ìíîï]/, "i");
          nextWord = nextWord.replace(/[Ç]/, "C");
          nextWord = nextWord.replace(/[ç]/, "c");

          return currentWord < nextWord ? -1 : currentWord > nextWord ? 1 : 0;
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
